import { action, computed, makeAutoObservable, observable } from "mobx";

export default class IslandStore {
    history = [1, 1]

    constructor() { 
        makeAutoObservable(this, {
            history: observable,
            currentId: computed,
            setCurrentId: action,
            setHistory: action,
            undo: action,
        }); 
    }

    get currentId() {
        return this.history[0];
    }

    setCurrentId(id) {
        this.history = [ id, this.history[0] ];
    }

    setHistory(history) {
        this.history = history;
    }

    undo () {
        this.setCurrentId(this.history[1]);
    }
}