import RoomStore from "@stores/Room.store";

import handlerReceivedRoom from "@utils/handlersReceivedData/handlerReceivedRoom";

export default class RoomInfoService {
    #store;
    #request;

    constructor(request) {
        this.#request = request;
        this.#store = new RoomStore();
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

    get Id() {
        return this.#store.id;
    }

    get Name() {
        return this.#store.name;
    }

    get Owner() {
        return this.#store.owner;
    }

    get Settings() {
        return this.#store.settings;
    }

    get Tags() {
        return this.#store.tags;
    }

    get CreatedAt() {
        return this.#store.createdAt;
    }

    get State() {
        return this.#store.state;
    }

    setRoom(room) {
        this.#store.setRoom(room);
    }

    setName(name) {
        this.#store.setName(name);
    }

    setSettings(settings) {
        if (typeof settings === "function") {
            return this.#store.setSettings(settings(this.Settings));
        } 

        this.#store.setSettings(settings);
    }

    async update() {
        const params = { id: this.Id };
        await this.#request.start({ params });
    }

    clear() {
        this.#store.clear();
    }

    #onStart() {
        return this.#request.onStart(() => {
            this.#store.clear();
            this.#store.setState("pending");
        })
    }

    #onResponse() {
        return this.#request.onResponse(response => {
            if (response && response.status === 200) {
                const room = handlerReceivedRoom(response.data.body.room);
                this.#store.setRoom(room);
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