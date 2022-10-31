import { makeAutoObservable, observable, action } from "mobx";

export default class MediaDataStore {
    isMuteAudio = false;
    isMuteVideo = false;

    constructor() {
        makeAutoObservable(this, {
            isMuteAudio: observable,
            isMuteVideo: observable,

            setIsMuteAudio: action,
            setIsMuteVideo: action
        });
    }

    setIsMuteAudio(value) {
        this.isMuteAudio = value;
    }

    setIsMuteVideo(value) {
        this.isMuteVideo = value;
    }
}