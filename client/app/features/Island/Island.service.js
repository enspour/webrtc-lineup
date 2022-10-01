export default class IslandService {
    #store;

    constructor(store) {
        this.#store = store;
    }

    get CurrentId() {
        return this.#store.currentId;
    }

    set CurrentId(id) {
        if (this.#store.history[0] !== id) {
            this.#store.setCurrentId(id);
        }
    }

    get History() {
        return this.#store.history;
    }

    set History(history) {
        this.#store.setHistory(history);
    }

    undo() {
        this.#store.undo();
    }
}