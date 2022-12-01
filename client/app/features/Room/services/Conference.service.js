import iceServersConfig from "app/configs/iceServers.config";

import { SpeechService } from "@features/Speech";

import ConferenceInfo from "./ConferenceInfo.service";

import PeersStore from "../stores/Peers.store";

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

        localStream?.getTracks().forEach(track => {
            this.#peerConnection.addTrack(track);
        });

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

    async sendOffer() {
        const offer = await this.#peerConnection.createOffer();
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

export default class ConferenceService {
    #signal;
    #room;
    #userMedia;
    
    #conferenceInfo;
    
    #peersStore;

    constructor(signal, room, userMedia) {
        this.#signal = signal;
        this.#room = room;
        this.#userMedia = userMedia;
        
        this.#conferenceInfo = new ConferenceInfo();
        
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
        const offJoin = this.#onJoin();
        const offLeave = this.#onLeave();

        return () => {
            offAcceptOffer();
            offAcceptAnswer();
            offAcceptIceCandidate();
            offUserLeave();
            offUserJoin();
            offJoin();
            offLeave();
        }
    }

    get Info() {
        return this.#conferenceInfo;
    }

    get Peers() {
        return this.#peersStore.peers;
    }

    async join(conference, constraints) {
        if (conference) {
            let waiter;
            
            const roomId = this.#room.Info.Id;
            const conferenceId = conference.id;

            if (roomId && conferenceId) { 
                this.#conferenceInfo.setConference(conference);
                await this.#userMedia.captureMedia(constraints);
        
                const clear = this.#signal.onJoinConference((status, message, data) => {
                    if (waiter) waiter({ status, message, data });
        
                    clear();
                });
                
                this.#signal.joinConference(conferenceId);
                
                return new Promise((resolve, _) => waiter = resolve);
            }
        
            return new Error("You are not connected to room yet");
        }
    }

    async leave() {
        const conferenceId = this.#conferenceInfo.Id;

        if (conferenceId) {
            let waiter;
    
            const roomId = this.#room.Info.Id;
    
            if (roomId && conferenceId) {
                const clear = this.#signal.onLeaveConference(async (status, message, data) => {
                    if (waiter) waiter({ status, message, data });

                    clear();
                });
    
                this.#signal.leaveConference(conferenceId);
    
                return new Promise((resolve, _) => waiter = resolve);
            }
    
            return new Error("You are not connected to room yet");
        }
    }

    async #sendOffer(peerId, userId) {
        const peer = new MediaPeerConnection(
            this.#conferenceInfo.Id, 
            peerId,
            userId,
            this.#userMedia.Stream, 
            this.#signal
        );
        
        this.#peersStore.add(peer);
        
        await peer.sendOffer();
    }

    #onAcceptOffer() {
        return this.#signal.onAcceptOffer(async (peerId, userId, offer) => {
            const peer = new MediaPeerConnection(
                this.#conferenceInfo.Id, 
                peerId,
                userId,
                this.#userMedia.Stream, 
                this.#signal
            );
            
            this.#peersStore.add(peer);
            
            if (offer) {
                await peer.acceptOffer(offer);
                await peer.sendAnswer();
            }
        } );
    }

    #onAcceptAnswer() {
        return this.#signal.onAcceptAnswer(async (peerId, userId, answer) => {
            const peer = this.#peersStore.peers.find(item => item.PeerId === peerId);
            if (peer) {
                await peer.acceptAnswer(answer);
            }
        });
    }

    #onAcceptIceCandidate() {
        return this.#signal.onAcceptIceCandidate(async (peerId, iceCandidate) => {
            const peer = this.#peersStore.peers.find(item => item.PeerId === peerId);
            if (peer) {
                await peer.addIceCandidate(iceCandidate);
            }
        });
    }

    #onUserJoin() {
        return this.#signal.onUserJoinConference(
            async (peerId, userId) => await this.#sendOffer(peerId, userId)
        );
    }

    #onUserLeave() {
        return this.#signal.onUserLeaveConference((peerId, userId) => {
            const peer = this.#peersStore.remove(peerId);
            if (peer) peer.close();
        })
    }

    #onJoin() {
        return this.#signal.onJoinConference((status) => {
            if (status !== 200) {
                this.#userMedia.stopCapturedMedia();
                this.#conferenceInfo.clear();
            }
        });
    }

    #onLeave() {
        return this.#signal.onLeaveConference((status) => {
            if (status === 200) {
                this.#userMedia.stopCapturedMedia();
                this.#conferenceInfo.clear();
                this.#peersStore.clear();
            }
        })
    }
}