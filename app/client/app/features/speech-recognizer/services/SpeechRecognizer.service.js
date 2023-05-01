import hark from "hark";

import SpeechRecognizerStore from "../store/SpeechRecognizer.store";

export default class SpeechRecognizerService {
    #store;

    constructor() {
        this.#store = new SpeechRecognizerStore();
    }

    initialize(stream) {
        const speech = hark(stream, { threshold: -80 });
    
        speech.on("speaking", () => {
            this.#store.setIsSpeaking(true);
        })

        speech.on("stopped_speaking", () => {
            this.#store.setIsSpeaking(false);
        })
    }

    get IsSpeaking() {
        return this.#store.isSpeaking;
    }

    get LastAudioActive() {
        return this.#store.lastAudioActive;
    }
}