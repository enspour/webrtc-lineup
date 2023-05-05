import ArrayStore from "@stores/Array.store";

import MediaPeerConnection from "./MediaPeerConnection";
import MediaPeersConnectionLogger from "./MediaPeersConnectionLogger.service";
import MediaPeersSignalService from "./MediaPeersSignal.service";

export default class MediaPeersConnectionService {
    #channelId;

    #mediaStream;
    #mediaInfo;
    #mediaPeersConnectionSignal;
    #mediaPeersConnectionLogger;

    #peers;

    constructor(channelId, mediaStream, mediaInfo, socket) {
        this.#channelId = channelId;

        this.#mediaStream = mediaStream;
        this.#mediaInfo = mediaInfo;

        this.#mediaPeersConnectionSignal = new MediaPeersSignalService(socket);
        this.#mediaPeersConnectionLogger = new MediaPeersConnectionLogger(this.#mediaPeersConnectionSignal);

        this.#peers = new ArrayStore();
    }

    initialize() {
        const mediaPeersConnectionSignalDestroyer = this.#mediaPeersConnectionSignal.initialize();
        const mediaPeersConnectionLoggerDestroyer = this.#mediaPeersConnectionLogger.initialize();

        const offAcceptOffer = this.#onAcceptOffer();
        const offAcceptAnswer = this.#onAcceptAnswer();
        const offAcceptIceCandidate = this.#onAcceptIceCandidate();

        return () => {
            mediaPeersConnectionSignalDestroyer();
            mediaPeersConnectionLoggerDestroyer();

            offAcceptOffer();
            offAcceptAnswer();
            offAcceptIceCandidate();
        }
    }

    get Peers() {
        return this.#peers.array;
    }

    async connect(peerId, userId) {
        const { enableVideo, enableAudio } = this.#mediaInfo;

        if (enableVideo || enableAudio) {
            const peer = new MediaPeerConnection(
                this.#mediaPeersConnectionSignal,
                this.#channelId,
                peerId,
                userId,
                this.#mediaStream,
            );
            
            this.#peers.append(peer);
            
            const options = { 
                offerToReceiveVideo: enableVideo,
                offerToReceiveAudio: enableAudio,
            }
    
            await peer.sendOffer(options);
        }
    }

    disconnect(peerId) {
        const index = this.#peers.array.findIndex(item => item.PeerId === peerId);
        const peer = this.#peers.remove(index);
        if (peer) peer.close();
    }

    disconnectAll() {
        for (const peer of this.#peers.array) {
            peer.close();
        }

        this.#peers.clear();
    }

    #onAcceptOffer() {
        return this.#mediaPeersConnectionSignal.onAcceptOffer(async (peerId, userId, offer) => {
            const { enableVideo, enableAudio } = this.#mediaInfo;

            if (enableVideo || enableAudio) {
                const peer = new MediaPeerConnection(
                    this.#mediaPeersConnectionSignal,
                    this.#channelId,
                    peerId,
                    userId,
                    this.#mediaStream 
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
        return this.#mediaPeersConnectionSignal.onAcceptAnswer(async (peerId, userId, answer) => {
            const peer = this.#peers.array.find(item => item.PeerId === peerId);
            if (peer) {
                await peer.acceptAnswer(answer);
            }
        });
    }

    #onAcceptIceCandidate() {
        return this.#mediaPeersConnectionSignal.onAcceptIceCandidate(async (peerId, iceCandidate) => {
            const peer = this.#peers.array.find(item => item.PeerId === peerId);
            if (peer) {
                await peer.addIceCandidate(iceCandidate);
            }
        });
    }
}