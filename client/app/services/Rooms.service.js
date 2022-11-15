import RoomsStore from "@stores/Rooms.store";

import handlerRecievedRooms from "@utils/handlersReceivedData/handlerReceivedRooms";

export default class RoomsService {
    #store;
    #request;

    constructor(request) {
        this.#request = request;
        this.#store = new RoomsStore();
    }

    initialize() {
        const offStart = this.#onStart();
        const offResponse = this.#onResponse();
        const offError = this.#onError();

        return () => {
            offStart();
            offResponse();
            offError();
        }
    }

    get Rooms() {
        return this.#store.rooms;
    }

    get State() {
        return this.#store.state;
    }

    async update(data) {
        await this.#request.start(data);
    }

    clear() {
        this.#store.clear();
    }

    #onStart() {
        return this.#request.onStart(() => {
            this.#store.setRooms([]);
            this.#store.setState("pending");
        })
    }

    #onResponse() {
        return this.#request.onResponse(response => {
            if (response && response.status === 200) {
                this.#store.setRooms(handlerRecievedRooms(response.data.body.rooms));
                this.#store.setState("done");
            }
        })
    }

    #onError() {
        return this.#request.onError(error => {
            if (error) {
                this.#store.setState("error");
            }
        });
    }
}