import { action, makeAutoObservable, observable } from "mobx";

export default class RoomStore {
    id = "";
    name = "";
    owner = {};
    settings = {};
    tags = [];
    modifiedAt = "";
    createdAt = "";

    constructor() {
        makeAutoObservable(this, {
            id: observable,
            name: observable,
            owner: observable,
            settings: observable,
            tags: observable,

            setRoom: action,
            setName: action,
            setSettings: action,
            clear: action
        });
    }

    setRoom(room) {
        this.id = room.id,
        this.name = room.name;
        this.owner = room.owner;
        this.settings = room.settings;
        this.tags = room.tags;
        this.modifiedAt = room.modifiedAt;
        this.createdAt = room.createdAt;
    }

    setName(name) {
        this.name = name;
    }

    setSettings(settings) {
        this.settings = settings;
    }

    clear() {
        this.id = "",
        this.name = "";
        this.owner = {};
        this.settings = {};
        this.tags = [];
        this.modifiedAt = "";
        this.createdAt = "";
    }
}