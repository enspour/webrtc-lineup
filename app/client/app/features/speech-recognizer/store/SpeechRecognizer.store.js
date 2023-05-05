import { action, makeAutoObservable, observable } from "mobx";

export default class SpeechRecognizerStore {
    lastAudioActive = 0;
    isSpeaking = false;

    constructor() {
        makeAutoObservable(this, {
            isSpeaking: observable,
            lastAudioActive: observable,
            setIsSpeaking: action,
            setLastAudioActive: action,
        });
    }

    setIsSpeaking(isSpeaking) {
        this.isSpeaking = isSpeaking;
    }

    setLastAudioActive(lastAudioActive) {
        this.lastAudioActive = lastAudioActive;
    }
}