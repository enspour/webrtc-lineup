import { action, computed, makeAutoObservable, observable } from "mobx";

import { IslandTabs } from "./Island.states";

export default class IslandStore {
    history = [1, 1]

    constructor() { 
        makeAutoObservable(this, {
            history: observable,
            currentId: computed,
            current: computed,
            setCurrentId: action,
            setHistory: action,
            back: action,
        }); 
    }

    get currentId() {
        return this.history[0];
    }

    get current() {
        return IslandTabs.find(item => item.id === this.currentId);
    }

    setCurrentId(id) {
        this.history = [ id, this.history[0] ];
    }

    setHistory(history) {
        if (Array.isArray(history) && history.length === 2) {
            this.history = history;
        }
    }

    back() {
        this.setCurrentId(this.history[1]);
    }
}