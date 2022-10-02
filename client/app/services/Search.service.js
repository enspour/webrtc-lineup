export default class SearchService {
    #store;
    #request;

    constructor(store, api, roomAPI) {
        this.#store = store;
        this.#request = api.createRequest(roomAPI.search);
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

    get Rooms() {
        return this.#store.rooms;
    }

    async update() {
        await this.#store.update(this.#request);
    }

    clear() {
        this.#store.clear();
    }
}