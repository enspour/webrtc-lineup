import { action, makeAutoObservable, observable } from "mobx"

export default class StateStore {
    state = "done"; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this, {
            state: observable,
            setState: action,
            clear: action,
        });
    }

    setState(state) {
        this.state = state;
    } 

    clear() {
        this.state = "done";
    }
}