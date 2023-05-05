import API from "@api/API";
import ConferencesAPI from "@api/ConferencesAPI";

import RequestedArrayService from "@services/RequestedArray.service";

import { 
    transformToConference, 
    transformToConferencesStores 
} from "../../conference";

export default class RoomConferencesService {
    #roomStore;
    #roomSignal;

    #conferences;

    constructor(roomStore, roomSignal) {
        this.#roomStore = roomStore;
        this.#roomSignal = roomSignal;

        this.#conferences = new RequestedArrayService(
            API.createRequest(ConferencesAPI.findAll),
            (data) => transformToConferencesStores(data.body.conferences)
        );
    }

    initialize() {
        const conferencesDestroyer = this.#conferences.initialize();

        const offConferenceInfoUpdated = this.#onConferenceInfoUpdated();

        return () => {
            conferencesDestroyer();

            offConferenceInfoUpdated();
        }
    }

    get Array() {
        return this.#conferences.Array;
    }

    async update() {
        await this.#conferences.update({ params: { room_id: this.#roomStore.id } })
    }

    #onConferenceInfoUpdated() {
        return this.#roomSignal.onConferenceInfoUpdated((data) => {
            const conference = transformToConference(data);
            
            const index = this.#conferences.Array.findIndex(item => item.id === conference.id);
            if (index !== -1) {
                this.#conferences.Array[index].setConference(conference);
            }
        });
    }
}