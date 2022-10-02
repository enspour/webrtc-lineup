export default class UserRoomsService {
    #store;
    #request;

    constructor(store, api, roomAPI) {
        this.#store = store;
        this.#request = api.createRequest(roomAPI.getCreated);
    }

    get Rooms() {
        return this.#store.rooms;
    }

    get State() {
        return this.#store.state;
    }

    async update() {
        await this.#store.update(this.#request);
    }

    clear() {
        this.#store.clear();
    }
}