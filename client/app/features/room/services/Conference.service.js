import iceServersConfig from "app/configs/iceServers.config";

import { SpeechService } from "@features/speech";

import PeersStore from "../store/Peers.store";

class MediaPeerConnection {
    #roomId;
    #peerId;
    #signal;
    #stream;
    #speechService;
    #peerConnection;
    
    constructor(roomId, peerId, localStream, signal) {
        this.#roomId = roomId;
        this.#peerId = peerId;
        this.#signal = signal;
        this.#stream = new MediaStream();
        this.#speechService = new SpeechService();
        this.#peerConnection = new RTCPeerConnection(iceServersConfig);

        localStream.getTracks().forEach(track => {
            this.#peerConnection.addTrack(track);
        });

        this.#peerConnection.ontrack = event => {
            this.#stream.addTrack(event.track);
        }

        this.#peerConnection.onconnectionstatechange = () => {
            if (this.#peerConnection.connectionState === "connected") {
                this.#speechService.initialize(this.#stream);
            }
        }

        this.#peerConnection.onicecandidate = event => {
            if (event.candidate) {
                this.#signal.sendIceCandidate(this.#roomId, this.#peerId, event.candidate);
            }
        }
    }

    get Stream() {
        return this.#stream;
    }

    get PeerId() {
        return this.#peerId;
    }

    get IsSpeaking() {
        return this.#speechService.IsSpeaking;
    }

    get LastAudioActive() {
        return this.#speechService.LastAudioActive;
    }

    close() {
        this.#peerConnection.close();
    }

    async sendOffer() {
        const offer = await this.#peerConnection.createOffer();
        await this.#peerConnection.setLocalDescription(offer);
        this.#signal.sendOffer(this.#roomId, this.#peerId, offer);
    }

    async acceptOffer(offer) {
        if (offer) {
            await this.#peerConnection.setRemoteDescription(offer);
        }
    }

    async sendAnswer() {
        const answer = await this.#peerConnection.createAnswer();
        await this.#peerConnection.setLocalDescription(answer);
        this.#signal.sendAnswer(this.#roomId, this.#peerId, answer);
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
    #roomInfo;
    #userMedia;
    
    #peersStore;

    constructor(signal, roomInfo, userMedia) {
        this.#signal = signal;
        this.#roomInfo = roomInfo;
        this.#userMedia = userMedia;
        
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
        let waiter;
        
        const id = this.#roomInfo.Id;
        
        if (id) {
            await this.#userMedia.captureMedia(constraints);

            const clear = this.#signal.onJoinConference((status, message, data) => {
                if (status !== 200) {
                    this.#userMedia.stopCapturedMedia();
                }

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

        const id = this.#roomInfo.Id;

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
        const peer = new MediaPeerConnection(this.#roomInfo.Id, peerId, this.#userMedia.Stream, this.#signal);
        this.#peersStore.add(peer);
        
        await peer.sendOffer();
    }

    #onAcceptOffer() {
        return this.#signal.onAcceptOffer(async (sourceId, offer) => {
            const peer = new MediaPeerConnection(this.#roomInfo.Id, sourceId, this.#userMedia.Stream, this.#signal);
            this.#peersStore.add(peer);
            
            if (offer) {
                await peer.acceptOffer(offer);
                await peer.sendAnswer();
            }
        } );
    }

    #onAcceptAnswer() {
        return this.#signal.onAcceptAnswer(async (sourceId, answer) => {
            const peer = this.#peersStore.peers.find(item => item.PeerId === sourceId);
            if (peer) {
                await peer.acceptAnswer(answer);
            }
        });
    }

    #onAcceptIceCandidate() {
        return this.#signal.onAcceptIceCandidate(async (sourceId, iceCandidate) => {
            const peer = this.#peersStore.peers.find(item => item.PeerId === sourceId);
            if (peer) {
                await peer.addIceCandidate(iceCandidate);
            }
        });
    }

    #onUserJoin() {
        return this.#signal.onUserJoinConference(async peerId => await this.#sendOffer(peerId));
    }

    #onUserLeave() {
        return this.#signal.onUserLeaveConference(peerId => {
            const peer = this.#peersStore.remove(peerId);
            if (peer) peer.close();
        })
    }

    #onLeave() {
        return this.#signal.onLeaveConference((status) => {
            if (status === 200) {
                this.#userMedia.stopCapturedMedia();
                this.#peersStore.clear();
            }
        })
    }
}