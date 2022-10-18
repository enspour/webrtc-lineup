import { action, autorun, makeAutoObservable, observable } from "mobx"

export default class SearchStore {
    searchedText = "";

    history = [];
    
    #size;
    #delay;
    #timeout;

    constructor(historySize = 10, sleepBeforeAdd = 2000) {
        this.#delay = sleepBeforeAdd;
        this.#size = historySize;

        makeAutoObservable(this, {
            searchedText: observable,
            setSearchedText: action,
            
            history: observable,
            setHistory: action,

            pushHistoryItem: action,
            removeHistoryItem: action,
            pushHistoryCurrentItem: action,
        });

        autorun(() => {
            if (this.searchedText) {
                clearTimeout(this.#timeout);
                this.#timeout = setTimeout(() => this.pushHistoryCurrentItem(), this.#delay)
            } else {
                this.clear();
            }
        })
    }

    setSearchedText(text) {
        this.searchedText = text;
    }

    setHistory(history) {
        this.history = history;
    }

    pushHistoryItem(text) {
        this.removeHistoryItem(text);

        this.history.unshift(text);

        while (this.history.length > this.#size) {
            this.history.pop();
        }
    }

    pushHistoryCurrentItem() {
        const text = this.searchedText;
        this.pushHistoryItem(text);
    }

    removeHistoryItem(text) {
        const index = this.history.findIndex(item => item === text);
        if (index !== -1) {
            this.history.splice(index, 1)
        }
    }

    clear() {
        clearTimeout(this.#timeout);
    }
}