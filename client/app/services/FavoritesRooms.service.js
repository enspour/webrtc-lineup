import RoomsStore from "@store/Rooms.store";

export default class FavoritesRooms {
    #roomsStore;

    constructor(api, roomAPI) {
        const request = api.createRequest(roomAPI.getFavorites);
        this.#roomsStore = new RoomsStore(request);
    }

    get Rooms() {
        return this.#roomsStore.rooms;
    }

    get State() {
        return this.#roomsStore.state;
    }

    async update() {
        await this.#roomsStore.update({});
    }

    clear() {
        this.#roomsStore.clear();
    }
}