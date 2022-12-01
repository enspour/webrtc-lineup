import ConferenceStore from "../stores/Conference.store";

export default class ConferenceInfo {
    #store;

    constructor() {
        this.#store = new ConferenceStore();
    }

    get Id() {
        return this.#store.id;
    }

    get Name() {
        return this.#store.name;
    }

    get Description() {
        return this.#store.description;
    }

    get Settings() {
        return this.#store.settings;
    }

    get CreatedAt() {
        return this.#store.createdAt;
    }

    get ModifiedAt() {
        return this.#store.modifiedAt;
    }

    setConference(conference) {
        this.#store.setConference(conference);
    }

    clear() {
        this.#store.clear();
    }
}