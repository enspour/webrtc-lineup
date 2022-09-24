import { action, makeAutoObservable, observable } from "mobx"

export default class SearchStore {
    searchedText = "";
    items = [];

    constructor() {
        makeAutoObservable(this, {
            searchedText: observable,
            items: observable,

            setSearchedText: action,
        })
    }

    setSearchedText(text) {
        this.searchedText = text;
    }

    setItems(items) {
        this.items = items;
    }
}