import { action, autorun, makeAutoObservable, observable, runInAction } from "mobx";

export default class SpeechStore {
    lastAudioActive = 0;
    isSpeaking = false;

    constructor() {
        makeAutoObservable(this, {
            isSpeaking: observable,
            lastAudioActive: observable,
            setIsSpeaking: action,
        });

        autorun(() => {
            if (this.isSpeaking) {
                runInAction(() => {
                    this.lastAudioActive = Date.now();
                })
            }
        });
    }

    setIsSpeaking(isSpeaking) {
        this.isSpeaking = isSpeaking;
    }
}