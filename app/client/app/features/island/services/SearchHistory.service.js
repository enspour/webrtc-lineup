import { autorun } from "mobx";

import removeDuplicates from "@utils/removeDuplicates";

export default class SearchHistoryService {
    #size = 50;

    #localStorage;
    #searchStore;

    constructor(localStorage, searchStore) {
        this.#localStorage = localStorage;
        this.#searchStore = searchStore;
    }

    initialize() {
        this.#load();

        const offAutoSave = this.#onAutoSave();

        return () => {
            offAutoSave();
        }
    }

    get Array() {
        return this.#searchStore.history;
    }

    push(text) {
        this.remove(text);

        const history = this.#searchStore.history;

        this.#searchStore.setHistory([text, ...history])

        while (history.length > this.#size) {
            this.#searchStore.setHistory(history.slice(0, history.length - 1))
        }
    }

    remove(text) {
        const history = this.#searchStore.history;
        
        const index = history.findIndex(item => item === text);
        if (index !== -1) {
            this.#searchStore.setHistory([...history.slice(0, index), ...history.slice(index + 1)])
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
}