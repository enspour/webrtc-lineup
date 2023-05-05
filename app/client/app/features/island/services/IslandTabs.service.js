import { autorun } from "mobx";

import { 
    IslandSearchTab, 
    IslandFavoritesTab, 
    IslandStoreTab 
} from "../stores/Island.states";

export default class IslandTabsService {
    #localStorage;

    #islandStore

    constructor(localStorage, islandStore) {
        this.#localStorage = localStorage;

        this.#islandStore = islandStore;
    }

    initialize() {
        this.#load();

        const offAutoSave = this.#onAutoSave();

        return () => {
            offAutoSave();
        }
    }

    get Current() {
        return this.#islandStore.current;
    }

    get CurrentId() {
        return this.#islandStore.currentId;
    }

    get History() {
        return this.#islandStore.history;
    }

    openSearch() {
        this.#setCurrentId(IslandSearchTab.id);
    }

    openFavorites() {
        this.#setCurrentId(IslandFavoritesTab.id);
    }

    openStore() {
        this.#setCurrentId(IslandStoreTab.id);
    }

    back() {
        this.#islandStore.back();
    }

    #setCurrentId(id) {
        if (this.#islandStore.history[0] !== id) {
            this.#islandStore.setCurrentId(id);
        }
    }

    #load() {
        this.#islandStore.setHistory(this.#localStorage.get("__tab_history"));
    }

    #onAutoSave() {
        return autorun(() => {
            if (this.History && this.History[0] !== this.History[1]) {
                this.#localStorage.set("__tab_history", this.History);
            }
        })
    }
}