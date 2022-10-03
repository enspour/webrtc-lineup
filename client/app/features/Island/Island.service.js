import IslandStore from "./Island.store";

export default class IslandService {
    #islandStore;

    constructor() {
        this.#islandStore = new IslandStore();
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
}