import PeersStore from "../store/Peers.store";

class MediaPeerConnection {
    #signal;
    #peerConnection;

    constructor(roomId, remotePeerId, mediaStream, signal, configuration) {
        this.roomId = roomId;
        this.remotePeerId = remotePeerId;
        this.remoteStream = new MediaStream();

        this.#signal = signal;
        this.#peerConnection = new RTCPeerConnection(configuration);

        mediaStream.getTracks().forEach(track => {
            this.#peerConnection.addTrack(track);
        })
        
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
            const answer = await this.#peerConnection.createAnswer();
            await this.#peerConnection.setLocalDescription(answer);
            this.#signal.sendAnswer(this.roomId, this.remotePeerId, answer);
        }
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
    #roomstore;
    #configuration;

    #mediaStream;
    
    #peersStore;

    constructor(signal, roomstore, configuration) {
        this.#signal = signal;
        this.#roomstore = roomstore;
        this.#configuration = configuration;

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

        return () => {
            offAcceptOffer();
            offAcceptAnswer();
            offAcceptIceCandidate();
            offUserLeave();
            offUserJoin();
        }
    }

    get Peers() {
        return this.#peersStore.peers;
    }

    async join(mediaStream) {
        this.#mediaStream = mediaStream;

        let waiter;

        const id = this.#roomstore.id;

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

        const id = this.#roomstore.id;

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
        const peer = new MediaPeerConnection(this.#roomstore.id, peerId, this.#mediaStream, this.#signal, this.#configuration);
        this.#peersStore.add(peer);
        
        await peer.sendOffer();
    }

    #onAcceptOffer() {
        return this.#signal.onAcceptOffer(async (sourceId, offer) => {
            const peer = new MediaPeerConnection(this.#roomstore.id, sourceId, this.#mediaStream, this.#signal, this.#configuration);
            this.#peersStore.add(peer);
            
            await peer.acceptOffer(offer);
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
}