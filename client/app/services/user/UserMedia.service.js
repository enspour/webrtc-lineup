import MediaDataStore from "@stores/MediaData.store";

import { SpeechService } from "@features/Speech";

export default class UserMediaService {
    #userDevices;
    #speech;

    #mediaData;

    #stream;

    constructor({ userDevices }) {
        this.#userDevices = userDevices;
        this.#speech = new SpeechService();

        this.#mediaData = new MediaDataStore();
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
        return this.#speech.IsSpeaking;
    }

    get LastAudioActive() {
        return this.#speech.LastAudioActive;
    }

    async captureMedia(constraints) {
        try {
            if (!this.#stream) {
                const _constraints = {};

                if (constraints.audio) {
                    const audioDeviceId = this.#userDevices.SelectedAudioInputDevice;
                    _constraints.audio = {
                        echoCancellation: false,
                        noiseSuppression: true,
                        deviceId: audioDeviceId
                    }
                }

                if (constraints.video) {
                    const videoDeviceId = this.#userDevices.SelectedVideoInputDevice;
                    _constraints.video = {
                        width: { max: 640 },
                        height: { max: 480 },
                        frameRate: 30,
                        facingMode: "user",
                        deviceId: videoDeviceId
                    }
                }

                const stream = await navigator.mediaDevices.getUserMedia(_constraints);

                if (constraints.audio) {
                    stream.getAudioTracks().forEach(track => {
                        track.enabled = !this.#mediaData.mutedAudio;
                    })

                    this.#speech.initialize(stream);
                }

                if (constraints.video) {
                    stream.getVideoTracks().forEach(track => {
                        track.enabled = !this.#mediaData.mutedVideo;
                    })
                }

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
        if (this.#stream) {
            this.#stream.getAudioTracks().forEach(track => {
                track.enabled = false;
            });
        }

        this.#mediaData.setMutedAudio(true);
    }

    unmuteAudio() {
        if (this.#stream) {
            this.#stream.getAudioTracks().forEach(track => {
                track.enabled = true;
            });
        }

        this.#mediaData.setMutedAudio(false);
    }

    muteVideo() {
        if (this.#stream) {
            this.#stream.getVideoTracks().forEach(track => {
                track.enabled = false;
            });
        }
        
        this.#mediaData.setMutedVideo(true);
    }

    unmuteVideo() {
        if (this.#stream) {
            this.#stream.getVideoTracks().forEach(track => {
                track.enabled = true;
            });
        }

        this.#mediaData.setMutedVideo(false);
    }
}