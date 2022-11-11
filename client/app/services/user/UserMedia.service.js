import MediaDataStore from "@store/MediaData.store";

import { SpeechService } from "@features/speech";

export default class UserMediaService {
    #stream;
    #mediaData;

    #speechService;
    #userDevices;

    constructor(userDevices) {
        this.#userDevices = userDevices;

        this.#mediaData = new MediaDataStore();
        this.#speechService = new SpeechService();
    }

    get Stream() {
        return this.#stream;
    }

    get MutedAudio() {
        return this.#mediaData.mutedAudio;
    }

    get MutedVideo() {
        return this.#mediaData.mutedVideo;
    }

    get IsSpeaking() {
        return this.#speechService.IsSpeaking;
    }

    get LastAudioActive() {
        return this.#speechService.LastAudioActive;
    }

    async captureMedia(constraints) {
        try {
            if (!this.#stream) {
                const audioDeviceId = this.#userDevices.SelectedAudioInputDevice;
                const videoDeviceId = this.#userDevices.SelectedVideoInputDevice;

                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: true,
                        deviceId: audioDeviceId
                    },
                    video: {
                        width: { max: 320 },
                        height: { max: 240 },
                        frameRate: 30,
                        facingMode: "user",
                        deviceId: videoDeviceId
                    }
                });
    
                stream.getTracks().forEach(track => {
                    if (track.kind in constraints) {
                        track.enabled = constraints[track.kind];
                    }
                });

                this.#mediaData.setMutedAudio(!constraints["audio"]);
                this.#mediaData.setMutedVideo(!constraints["video"]);

                this.#speechService.initialize(stream);

                this.#stream = stream;
            }
        } catch (err) {
            return new Error("Disable access to user media.")
        }
    }

    stopCapturedMedia() {
        if (this.#stream) {
            this.#stream.getTracks().forEach(track => track.stop());
            this.#stream = null;
        }
    }

    muteAudio() {
        if (!this.#stream) return;

        this.#stream.getAudioTracks().forEach(track => {
            track.enabled = false;
        });

        this.#mediaData.setMutedAudio(true);
    }

    unmuteAudio() {
        if (!this.#stream) return;

        this.#stream.getAudioTracks().forEach(track => {
            track.enabled = true;
        });

        this.#mediaData.setMutedAudio(false);
    }

    muteVideo() {
        if (!this.#stream) return;
        
        this.#stream.getVideoTracks().forEach(track => {
            track.enabled = false;
        });

        this.#mediaData.setMutedVideo(true);
    }

    unmuteVideo() {
        if (!this.#stream) return;
        
        this.#stream.getVideoTracks().forEach(track => {
            track.enabled = true;
        });

        this.#mediaData.setMutedVideo(false);
    }
}