import { action, makeAutoObservable, observable } from "mobx"

export default class SearchStore {
    text = "";
    history = [];

    constructor() {
        makeAutoObservable(this, {
            text: observable,
            setSearchedText: action,
            
            history: observable,
            setHistory: action, 
        });
    }

    setText(text) {
        this.text = text;
    }

    setHistory(history) {
        this.history = history;
    }
}