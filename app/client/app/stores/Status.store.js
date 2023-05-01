import { action, makeAutoObservable, observable } from "mobx"

export default class StatusStore {
    status = "idle"; // "idle", "pending", "done", "error"

    constructor() {
        makeAutoObservable(this, {
            status: observable,
            setStatus: action,
            clear: action,
        });
    }

    setStatus(status) {
        this.status = status;
    } 

    clear() {
        this.status = "idle";
    }
}