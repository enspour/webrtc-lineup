import { autorun } from "mobx";

import removeDuplicates from "@utils/removeDuplicates";

export default class SearchHistoryService {
    #size = 50;
    #delay = 2000;
    #timeout;

    #localStorage;
    #searchStore;

    constructor(localStorage, searchStore) {
        this.#localStorage = localStorage;
        this.#searchStore = searchStore;
    }

    initialize() {
        this.#load();

        const offAutoSave = this.#onAutoSave();
        const offAutoPush = this.#onAutoPush();

        return () => {
            offAutoSave();
            offAutoPush();
        }
    }

    get Array() {
        return this.#searchStore.history;
    }

    push(text) {
        this.remove(text);

        this.#searchStore.setHistory([text, ...this.History])

        while (this.History.length > this.#size) {
            this.#searchStore.setHistory(this.History.slice(0, this.History.length - 1))
        }
    }

    remove(text) {
        const index = this.History.findIndex(item => item === text);
        if (index !== -1) {
            this.#searchStore.setHistory([...this.History.slice(0, index), ...this.History.slice(index + 1)])
        }
    }

    #load() {
        const history = this.#localStorage.get("__history") || [];
        this.#searchStore.setHistory(removeDuplicates(history));
    }

    #onAutoSave() {
        return autorun(() => {
            const history = this.#searchStore.history;
            this.#localStorage.set("__history", history);
        })
    }

    #onAutoPush() {
        return autorun(() => {
            if (this.SearchedText) {
                clearTimeout(this.#timeout);
                this.#timeout = setTimeout(() => this.pushHistoryItem(this.SearchedText), this.#delay)
            } else {
                clearTimeout(this.#timeout);
            }
        })
    }
}