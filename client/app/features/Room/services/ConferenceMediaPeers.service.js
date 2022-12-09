import iceServersConfig from "app/configs/iceServers.config";

import { SpeechService } from "@features/Speech";

import ArrayStore from "@stores/Array.store";

class MediaPeerConnection {
    #conferenceId;
    #peerId;
    #userId;
    #signal;
    #stream;
    #speechService;
    #peerConnection;
    
    constructor(conferenceId, peerId, userId, localStream, signal) {
        this.#conferenceId = conferenceId;
        this.#peerId = peerId;
        this.#userId = userId;
        this.#signal = signal;
        this.#stream = new MediaStream();
        this.#speechService = new SpeechService();
        this.#peerConnection = new RTCPeerConnection(iceServersConfig);

        if (localStream) {
            localStream.getTracks().forEach(track => {
                this.#peerConnection.addTrack(track);
            });
        }

        this.#peerConnection.ontrack = event => {
            this.#stream.addTrack(event.track);
        }

        this.#peerConnection.onconnectionstatechange = () => {
            if (this.#peerConnection.connectionState === "connected" && this.#stream.getAudioTracks().length) {
                this.#speechService.initialize(this.#stream);
            }
        }

        this.#peerConnection.onicecandidate = event => {
            if (event.candidate) {
                this.#signal.sendIceCandidate(this.#conferenceId, this.#peerId, event.candidate);
            }
        }
    }

    get Stream() {
        return this.#stream;
    }

    get UserId() {
        return this.#userId;
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

    async sendOffer(options) {
        const offer = await this.#peerConnection.createOffer(options);
        await this.#peerConnection.setLocalDescription(offer);
        this.#signal.sendOffer(this.#conferenceId, this.#peerId, offer);
    }

    async acceptOffer(offer) {
        if (offer) {
            await this.#peerConnection.setRemoteDescription(offer);
        }
    }

    async sendAnswer() {
        const answer = await this.#peerConnection.createAnswer();
        await this.#peerConnection.setLocalDescription(answer);
        this.#signal.sendAnswer(this.#conferenceId, this.#peerId, answer);
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

export default class ConferenceMediaPeers {
    #conferenceInfo;

    #signal;
    #userMedia;

    #peers;

    constructor(conferenceInfo, signal, userMedia) {
        this.#conferenceInfo = conferenceInfo;

        this.#signal = signal;
        this.#userMedia = userMedia;

        this.#peers = new ArrayStore();
    }

    initialize() {
        const offLeave = this.#onLeave();

        const offUserJoin = this.#onUserJoin();
        const offUserLeave = this.#onUserLeave();

        const offAcceptOffer = this.#onAcceptOffer();
        const offAcceptAnswer = this.#onAcceptAnswer();
        const offAcceptIceCandidate = this.#onAcceptIceCandidate();

        return () => {
            offLeave();

            offUserJoin();
            offUserLeave();

            offAcceptOffer();
            offAcceptAnswer();
            offAcceptIceCandidate();
        }
    }

    get Peers() {
        return this.#peers.array;
    }

    #onLeave() {
        return this.#signal.onLeaveConference((status) => {
            if (status === 200) {
                this.#peers.clear();
            }
        })
    }

    #onUserJoin() {
        return this.#signal.onUserJoinConference(
            async (peerId, userId) => await this.#sendOffer(peerId, userId)
        );
    }

    #onUserLeave() {
        return this.#signal.onUserLeaveConference((peerId, userId) => {
            const index = this.#peers.array.findIndex(item => item.PeerId === peerId);
            const peer = this.#peers.remove(index);
            if (peer) peer.close();
        })
    }

    async #sendOffer(peerId, userId) {
        const enableVideo = this.#conferenceInfo.Settings.enableVideo;
        const enableAudio = this.#conferenceInfo.Settings.enableAudio;

        if (enableAudio || enableVideo) {
            const peer = new MediaPeerConnection(
                this.#conferenceInfo.Id, 
                peerId,
                userId,
                this.#userMedia.Stream, 
                this.#signal
            );
            
            this.#peers.append(peer);
            
            const options = { 
                offerToReceiveVideo: enableVideo,
                offerToReceiveAudio: enableAudio,
            }
    
            await peer.sendOffer(options);
        }
    }

    #onAcceptOffer() {
        return this.#signal.onAcceptOffer(async (peerId, userId, offer) => {
            const enableVideo = this.#conferenceInfo.Settings.enableVideo;
            const enableAudio = this.#conferenceInfo.Settings.enableAudio;

            if (enableAudio || enableVideo) {
                const peer = new MediaPeerConnection(
                    this.#conferenceInfo.Id, 
                    peerId,
                    userId,
                    this.#userMedia.Stream, 
                    this.#signal
                );
                
                this.#peers.append(peer);
                
                if (offer) {
                    await peer.acceptOffer(offer);
                    await peer.sendAnswer();
                }
            }
        });
    }

    #onAcceptAnswer() {
        return this.#signal.onAcceptAnswer(async (peerId, userId, answer) => {
            const peer = this.#peers.array.find(item => item.PeerId === peerId);
            if (peer) {
                await peer.acceptAnswer(answer);
            }
        });
    }

    #onAcceptIceCandidate() {
        return this.#signal.onAcceptIceCandidate(async (peerId, iceCandidate) => {
            const peer = this.#peers.array.find(item => item.PeerId === peerId);
            if (peer) {
                await peer.addIceCandidate(iceCandidate);
            }
        });
    }
}