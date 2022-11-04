import { action, makeAutoObservable, observable } from "mobx"

export default class RoomsStore {
    rooms = [];
    state = "pending"; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this, {
            rooms: observable,
            state: observable,
            setRooms: action,
            setState: action,
            clear: action,
        });
    }

    setState(state) {
        this.state = state;
    }

    setRooms(rooms) {
        this.rooms = rooms;
    }

    clear() {
        this.rooms = [];
        this.state = "done"
    }
}