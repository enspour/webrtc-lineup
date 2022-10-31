export default class UserMedia {
    #stream;

    get Stream() {
        return this.#stream;
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
}