import { autorun } from "mobx";
import hark from "hark";

import SpeechRecognizerStore from "../store/SpeechRecognizer.store";

export default class SpeechRecognizer {
    #speechRecognizerStore;

    #speech;

    #offUpdatingLastAudioActive;

    constructor() {
        this.#speechRecognizerStore = new SpeechRecognizerStore();
    }

    get IsSpeaking() {
        return this.#speechRecognizerStore.isSpeaking;
    }

    get LastAudioActive() {
        return this.#speechRecognizerStore.lastAudioActive;
    }

    start(stream) {
        this.#speech = hark(stream, { threshold: -80 });

        this.#speech.on("speaking", () => this.#speaking());
        this.#speech.on("stopped_speaking", () => this.#stoppedSpeaking());

        this.#offUpdatingLastAudioActive = this.#onUpdatingLastAudioActive();
    }

    stop() {
        if (this.#offUpdatingLastAudioActive) {
            this.#offUpdatingLastAudioActive();
            this.#offUpdatingLastAudioActive = null;
        }

        if (this.#speech) {
            this.#speech.stop();
            this.#speech = null;
        }
    }

    #speaking() {
        this.#speechRecognizerStore.setIsSpeaking(true);
    }

    #stoppedSpeaking() {
        this.#speechRecognizerStore.setIsSpeaking(false);
    }

    #onUpdatingLastAudioActive() {
        return autorun(() => {
            if (this.#speechRecognizerStore.isSpeaking) {
                this.#speechRecognizerStore.setLastAudioActive(Date.now());
            }
        });
    }
}