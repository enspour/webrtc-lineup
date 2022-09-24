export default class SearchService {
    #store;

    constructor(searchStore) {
        this.#store = searchStore;
    }

    get SearchedText() {
        return this.#store.searchedText;
    }

    set SearchedText(text) {
        if (typeof text === "string") {
            return this.#store.setSearchedText(text);
        }

        throw new Error("Text is invalid. It's must be string.")
    }

    get Items() {
        return this.#store.items;
    }

    set Items(items) {
        if (Array.isArray(items)) {
            return this.#store.setItems(items);
        }

        throw new Error("Items is invalid. It's must be array")
    }
}