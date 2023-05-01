import transformToConference from "../utils/transformToConference";

export default class ConferenceInfoService {
    #conferenceStore;
    #conferenceSignal;

    constructor(conferenceStore, conferenceSignal) {
        this.#conferenceStore = conferenceStore;
        this.#conferenceSignal = conferenceSignal;
    }

    initialize() {
        const offUpdateConferenceInfo = this.#onUpdateConferenceInfo();

        return () => {
            offUpdateConferenceInfo();
        }
    }

    get Id() {
        return this.#conferenceStore.id;
    }

    get Name() {
        return this.#conferenceStore.name;
    }

    get Description() {
        return this.#conferenceStore.description;
    }

    get Settings() {
        return this.#conferenceStore.settings;
    }

    get CreatedAt() {
        return this.#conferenceStore.createdAt;
    }

    get ModifiedAt() {
        return this.#conferenceStore.modifiedAt;
    }

    #onUpdateConferenceInfo() {
        return this.#conferenceSignal.onConferenceInformationUpdate((data) => {
            const conference = transformToConference(data);
            
            if (conference.id === this.Id) {
                this.#conferenceStore.setConference(conference);
            }
        });
    }
}