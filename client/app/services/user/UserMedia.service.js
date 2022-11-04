import MediaDataStore from "@store/MediaData.store";

export default class UserMediaService {
    #stream;
    #mediaData;

    constructor() {
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

    async captureMedia(constraints) {
        try {
            if (!this.#stream) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: true
                    },
                    video: {
                        width: { max: 320 },
                        height: { max: 240 },
                        frameRate: 30,
                        facingMode: "user"
                    }
                });
    
                stream.getTracks().forEach(track => {
                    if (track.kind in constraints) {
                        track.enabled = constraints[track.kind];
                    }
                });

                this.#mediaData.setMutedAudio(!constraints["audio"]);
                this.#mediaData.setMutedVideo(!constraints["video"]);

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