import { action, makeAutoObservable, observable } from "mobx";

export default class RoomStore {
    id = "";
    name = "";
    owner = {};
    settings = {};
    tags = [];
    createdAt = "";

    state = "done"; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this, {
            id: observable,
            name: observable,
            owner: observable,
            settings: observable,
            tags: observable,
            createdAt: observable,

            state: observable,

            setRoom: action,
            setName: action,
            setSettings: action,
            setState: action,
            clear: action
        });
    }

    setRoom(room) {
        this.id = room.id,
        this.name = room.name;
        this.owner = room.owner;
        this.settings = room.settings;
        this.tags = room.tags;
        this.createdAt = room.createdAt;
    }

    setName(name) {
        this.name = name;
    }

    setSettings(settings) {
        this.settings = settings;
    }

    setState(state) {
        this.state = state;
    }

    clear() {
        this.id = "",
        this.name = "";
        this.owner = {};
        this.settings = {};
        this.tags = [];
        this.createdAt = "";
        this.state = "done"
    }
}