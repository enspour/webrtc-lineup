import { action, makeAutoObservable, observable } from "mobx"

export default class SearchStore {
    searchedText = "";
    history = [];

    constructor() {
        makeAutoObservable(this, {
            searchedText: observable,
            setSearchedText: action,
            
            history: observable,
            setHistory: action, 
        });
    }

    setSearchedText(text) {
        this.searchedText = text;
    }

    setHistory(history) {
        this.history = history;
    }
}