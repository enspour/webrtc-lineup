import RoomStore from "../stores/Room.store";

import handlerRoom from "@utils/handlersReceivedData/handlerRoom";
import StateStore from "@stores/State.store";

export default class RoomInfoService {
    #request;
    #rooms;
    #roomsState;

    constructor(request) {
        this.#request = request;
        this.#rooms = new RoomStore();
        this.#roomsState = new StateStore();
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
        return this.#rooms.id;
    }

    get Name() {
        return this.#rooms.name;
    }

    get Owner() {
        return this.#rooms.owner;
    }

    get Settings() {
        return this.#rooms.settings;
    }

    get Tags() {
        return this.#rooms.tags;
    }

    get CreatedAt() {
        return this.#rooms.createdAt;
    }

    get State() {
        return this.#roomsState.state;
    }

    setRoom(room) {
        this.#rooms.setRoom(room);
    }

    setName(name) {
        this.#rooms.setName(name);
    }

    setSettings(settings) {
        if (typeof settings === "function") {
            return this.#rooms.setSettings(settings(this.Settings));
        } 

        this.#rooms.setSettings(settings);
    }

    async update() {
        const params = { id: this.Id };
        await this.#request.start({ params });
    }

    clear() {
        this.#rooms.clear();
        this.#roomsState.clear();
    }

    #onStart() {
        return this.#request.onStart(() => {
            this.#rooms.clear();
            this.#roomsState.setState("pending");
        })
    }

    #onResponse() {
        return this.#request.onResponse(response => {
            if (response && response.status === 200) {
                const room = handlerRoom(response.data.body.room);
                this.#rooms.setRoom(room);
                this.#roomsState.setState("done");
            }
        })
    }

    #onError() {
        return this.#request.onError(error => {
            if (error) {
                this.#roomsState.setState("error");
            }
        });
    }
}