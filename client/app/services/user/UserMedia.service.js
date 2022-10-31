import MediaDataStore from "@store/MediaData.store";

export default class UserMedia {
    #stream;
    #mediaData;

    constructor() {
        this.#mediaData = new MediaDataStore();
    }

    get Stream() {
        return this.#stream;
    }

    get IsMuteAudio() {
        return this.#mediaData.isMuteAudio;
    }

    get IsMuteVideo() {
        return this.#mediaData.isMuteVideo;
    }

    async captureMedia(constraints) {
        try {
            if (!this.#stream) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: true
                    },
                    video: true
                });
    
                stream.getTracks().forEach(track => {
                    if (track.kind in constraints) {
                        track.enabled = constraints[track.kind];
                    }
                });

                this.#mediaData.setIsMuteAudio(!constraints["audio"]);
                this.#mediaData.setIsMuteVideo(!constraints["video"]);

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

        this.#mediaData.setIsMuteAudio(true);
    }

    unmuteAudio() {
        if (!this.#stream) return;

        this.#stream.getAudioTracks().forEach(track => {
            track.enabled = true;
        });

        this.#mediaData.setIsMuteAudio(false);
    }

    muteVideo() {
        if (!this.#stream) return;
        
        this.#stream.getVideoTracks().forEach(track => {
            track.enabled = false;
        });

        this.#mediaData.setIsMuteVideo(true);
    }

    unmuteVideo() {
        if (!this.#stream) return;
        
        this.#stream.getVideoTracks().forEach(track => {
            track.enabled = true;
        });

        this.#mediaData.setIsMuteVideo(false);
    }
}