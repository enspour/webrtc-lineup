import iceServersConfig from "app/configs/iceServers.config";

import PeersStore from "../store/Peers.store";

import stores from "../store";

class MediaPeerConnection {
    #signal;
    #peerConnection;

    constructor(roomId, remotePeerId, mediaStream, signal) {
        this.roomId = roomId;
        this.remotePeerId = remotePeerId;
        this.remoteStream = new MediaStream();
        
        this.#signal = signal;
        this.#peerConnection = new RTCPeerConnection(iceServersConfig);

        mediaStream.getTracks().forEach(track => {
            this.#peerConnection.addTrack(track);
        });

        this.#peerConnection.ontrack = event => {
            this.remoteStream.addTrack(event.track);
        }

        this.#peerConnection.onicecandidate = event => {
            if (event.candidate) {
                this.#signal.sendIceCandidate(this.roomId, this.remotePeerId, event.candidate);
            }
        }
    }

    async sendOffer() {
        const offer = await this.#peerConnection.createOffer();
        await this.#peerConnection.setLocalDescription(offer);
        this.#signal.sendOffer(this.roomId, this.remotePeerId, offer);
    }

    async acceptOffer(offer) {
        if (offer) {
            await this.#peerConnection.setRemoteDescription(offer);
        }
    }

    async sendAnswer() {
        const answer = await this.#peerConnection.createAnswer();
        await this.#peerConnection.setLocalDescription(answer);
        this.#signal.sendAnswer(this.roomId, this.remotePeerId, answer);
    }

    async acceptAnswer(answer) {
        if (answer) {
            await this.#peerConnection.setRemoteDescription(answer);
        }
    }

    async addIceCandidate(candidate) {
        if (candidate) {
            await this.#peerConnection.addIceCandidate(candidate);
        }
    } 
}

export default class ConferenceService {
    #signal;
    #room;
    
    #peersStore;

    #mediaStream;
    #userMedia;

    constructor(signal, userMedia) {
        this.#signal = signal;
        this.#userMedia = userMedia;
        
        this.#room = stores.room;
        this.#peersStore = new PeersStore();
    }

    initialize() {
        this.#signal.onSendOffer((status, message, data) => console.log(status, message, data))
        this.#signal.onSendAnswer((status, message, data) => console.log(status, message, data))
        this.#signal.onSendIceCandidate((status, message, data) => console.log(status, message, data))
        this.#signal.onUserJoinConference(socketId => console.log("User join to conference", socketId))
        this.#signal.onUserLeaveConference(socketId => console.log("User leave to conference", socketId))
        
        const offAcceptOffer = this.#onAcceptOffer();
        const offAcceptAnswer = this.#onAcceptAnswer();
        const offAcceptIceCandidate = this.#onAcceptIceCandidate();
        const offUserLeave = this.#onUserLeave();
        const offUserJoin = this.#onUserJoin();
        const offLeave = this.#onLeave();

        return () => {
            offAcceptOffer();
            offAcceptAnswer();
            offAcceptIceCandidate();
            offUserLeave();
            offUserJoin();
            offLeave();
        }
    }

    get Peers() {
        return this.#peersStore.peers;
    }

    async join(constraints) {
        this.#mediaStream = await this.#userMedia.captureMedia(constraints);

        let waiter;

        const id = this.#room.id;

        if (id) {
            const clear = this.#signal.onJoinConference(async (status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            });
            
            this.#signal.joinConference(id);
            
            return new Promise((resolve, _) => waiter = resolve);
        }

        return new Error("You are not connected to room yet");
    }

    async leave() {
        let waiter;

        const id = this.#room.id;

        if (id) {
            const clear = this.#signal.onLeaveConference(async (status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            });

            this.#signal.leaveConference(id);

            return new Promise((resolve, _) => waiter = resolve);
        }

        return new Error("You are not connected to room yet");
    }

    async #sendOffer(peerId) {
        const peer = new MediaPeerConnection(this.#room.id, peerId, this.#mediaStream, this.#signal);
        this.#peersStore.add(peer);
        
        await peer.sendOffer();
    }

    #onAcceptOffer() {
        return this.#signal.onAcceptOffer(async (sourceId, offer) => {
            const peer = new MediaPeerConnection(this.#room.id, sourceId, this.#mediaStream, this.#signal);
            this.#peersStore.add(peer);
            
            if (offer) {
                await peer.acceptOffer(offer);
                await peer.sendAnswer();
            }
        } );
    }

    #onAcceptAnswer() {
        return this.#signal.onAcceptAnswer(async (sourceId, answer) => {
            const peer = this.#peersStore.peers.find(item => item.remotePeerId === sourceId);
            if (peer) {
                await peer.acceptAnswer(answer);
            }
        });
    }

    #onAcceptIceCandidate() {
        return this.#signal.onAcceptIceCandidate(async (sourceId, iceCandidate) => {
            const peer = this.#peersStore.peers.find(item => item.remotePeerId === sourceId);
            if (peer) {
                await peer.addIceCandidate(iceCandidate);
            }
        });
    }

    #onUserJoin() {
        return this.#signal.onUserJoinConference(async peerId => await this.#sendOffer(peerId));
    }

    #onUserLeave() {
        return this.#signal.onUserLeaveConference(peerId => this.#peersStore.remove(peerId))
    }

    #onLeave() {
        return this.#signal.onLeaveConference((status) => {
            if (status === 200) {
                this.#userMedia.stopCapturedMedia(this.#mediaStream);
                this.#peersStore.clear();
            }
        })
    }
}