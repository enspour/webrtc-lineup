import { makeAutoObservable, runInAction } from "mobx"

export default class SearchStore {
    searchedText = ""; 

    constructor() {
        makeAutoObservable(this);
    }

    setSearchedText(text) {
        this.searchedText = text;
    }
}