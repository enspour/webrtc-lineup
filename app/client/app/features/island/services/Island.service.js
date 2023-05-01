import { IslandSearchTab } from "../stores/Island.states";
import IslandStore from "../stores/Island.store";

export default class IslandService {
    #islandStore;

    constructor() {
        this.#islandStore = new IslandStore();
    }

    get Current() {
        return this.#islandStore.current;
    }

    get CurrentId() {
        return this.#islandStore.currentId;
    }

    set CurrentId(id) {
        if (this.#islandStore.history[0] !== id) {
            this.#islandStore.setCurrentId(id);
        }
    }

    get History() {
        return this.#islandStore.history;
    }

    set History(history) {
        this.#islandStore.setHistory(history);
    }

    undo() {
        this.#islandStore.undo();
    }

    goSearch() {
        this.CurrentId = IslandSearchTab.id;
    }
}