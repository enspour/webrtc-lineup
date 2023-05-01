import { makeAutoObservable, observable } from "mobx";

export default class ConferenceStore {
    id;
    name;
    description;
    settings; 
    modifiedAt;
    createdAt;

    constructor(conference) {
        if (conference) {
            this.setConference(conference);
        } else {
            this.clear();
        }

        makeAutoObservable(this, {
            id: observable,
            name: observable,
            description: observable,
            settings: observable,
        });
    }

    setConference(conference) {
        this.id = conference.id;
        this.name = conference.name;
        this.description = conference.description;
        this.settings = conference.settings;
        this.modifiedAt = conference.modifiedAt;
        this.createdAt = conference.createdAt;
    }

    clear() {
        this.id = "";
        this.name = "";
        this.description = "";
        this.settings = {}; 
        this.modifiedAt = "";
        this.createdAt = "";
    }
}