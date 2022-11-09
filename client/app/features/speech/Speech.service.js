import hark from "hark";

import SpeechStore from "./Speech.store";

export default class SpeechService {
    #store;

    constructor() {
        this.#store = new SpeechStore();
    }

    initialize(stream) {
        const speech = hark(stream, { threshold: 0 });
    
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