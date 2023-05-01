import iceServersConfig from "app/configs/iceServers.config";

import { SpeechRecognizerService } from "@features/speech-recognizer";

export default class MediaPeerConnectionService {
    #mediaPeerSignal;
    
    #channelId;
    #peerId;
    #userId;
    #peerConnection;
    
    #remoteMediaStream;

    #speechRecognizer;
    
    constructor(mediaPeerSignal, channelId, peerId, userId, mediaStream) {
        this.#mediaPeerSignal = mediaPeerSignal;

        this.#channelId = channelId;
        this.#peerId = peerId;
        this.#userId = userId;
        this.#peerConnection = new RTCPeerConnection(iceServersConfig);
        
        this.#remoteMediaStream = new MediaStream();
        
        this.#speechRecognizer = new SpeechRecognizerService();

        if (mediaStream) {
            mediaStream.getTracks().forEach(track => {
                this.#peerConnection.addTrack(track);
            });
        }

        this.#peerConnection.ontrack = event => {
            this.#remoteMediaStream.addTrack(event.track);
        }

        this.#peerConnection.onconnectionstatechange = () => {
            if (
                this.#peerConnection.connectionState === "connected" 
                && this.#remoteMediaStream.getAudioTracks().length
            ) {
                this.#speechRecognizer.initialize(this.#remoteMediaStream);
            }
        }

        this.#peerConnection.onicecandidate = event => {
            if (event.candidate) {
                this.#mediaPeerSignal.sendIceCandidate(this.#channelId, this.#peerId, event.candidate);
            }
        }
    }

    get RemoteMediaStream() {
        return this.#remoteMediaStream;
    }

    get PeerId() {
        return this.#peerId;
    }

    get UserId() {
        return this.#userId;
    }

    get IsSpeaking() {
        return this.#speechRecognizer.IsSpeaking;
    }

    get LastAudioActive() {
        return this.#speechRecognizer.LastAudioActive;
    }

    close() {
        this.#peerConnection.close();
    }

    async sendOffer(options) {
        const offer = await this.#peerConnection.createOffer(options);
        await this.#peerConnection.setLocalDescription(offer);
        this.#mediaPeerSignal.sendOffer(this.#channelId, this.#peerId, offer);
    }

    async acceptOffer(offer) {
        if (offer) {
            await this.#peerConnection.setRemoteDescription(offer);
        }
    }

    async sendAnswer() {
        const answer = await this.#peerConnection.createAnswer();
        await this.#peerConnection.setLocalDescription(answer);
        this.#mediaPeerSignal.sendAnswer(this.#channelId, this.#peerId, answer);
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
