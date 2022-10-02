import { action, makeAutoObservable, observable } from "mobx"

export default class SearchStore {
    searchedText = ""; 

    constructor() {
        makeAutoObservable(this, {
            searchedText: observable,
            setSearchedText: action
        });
    }

    setSearchedText(text) {
        this.searchedText = text;
    }
}