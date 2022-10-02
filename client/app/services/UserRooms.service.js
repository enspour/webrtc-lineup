export default class UserRoomsService {
    #store;

    constructor(store) {
        this.#store = store;
    }

    get Rooms() {
        return this.#store.rooms;
    }

    get State() {
        return this.#store.state;
    }

    async update() {
        await this.#store.update();
    }

    clear() {
        this.#store.clear();
    }
}