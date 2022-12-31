import { makeAutoObservable, observable, action } from "mobx";

export default class MediaDataStore {
    mutedAudio = false;
    mutedVideo = false;

    constructor() {
        makeAutoObservable(this, {
            mutedAudio: observable,
            mutedVideo: observable,

            setMutedAudio: action,
            setMutedVideo: action
        });
    }

    setMutedAudio(value) {
        this.mutedAudio = value;
    }

    setMutedVideo(value) {
        this.mutedVideo = value;
    }
}