export default class UserRoomsService {
    #roomsStore;
    #request;

    constructor(roomsStore, api, roomAPI) {
        this.#roomsStore = roomsStore;
        this.#request = api.createRequest(roomAPI.getCreated);
    }

    get Rooms() {
        return this.#roomsStore.rooms;
    }

    get State() {
        return this.#roomsStore.state;
    }

    async update() {
        const data = {};

        await this.#roomsStore.update(this.#request, data);
    }

    clear() {
        this.#roomsStore.clear();
    }
}