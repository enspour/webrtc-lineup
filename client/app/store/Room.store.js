import { action, makeAutoObservable, observable } from "mobx";

export default class RoomStore {
    id;
    name;
    owner;
    tags;
    createdAt;

    constructor() {
        makeAutoObservable(this, {
            id: observable,
            name: observable,
            owner: observable,
            tags: observable,
            createdAt: observable,

            setRoom: action,
        });
    }

    setRoom(room) {
        this.id = room.id,
        this.name = room.name;
        this.owner = room.owner;
        this.tags = room.tags;
        this.createdAt = room.createdAt;
    }
}