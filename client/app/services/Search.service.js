export default class SearchService {
    #roomsStore;
    #searchStore;
    #request;

    constructor(roomsStore, searchStore, api, roomAPI) {
        this.#roomsStore = roomsStore;
        this.#searchStore = searchStore;
        this.#request = api.createRequest(roomAPI.search);
    }

    get SearchedText() {
        return this.#searchStore.searchedText;
    }

    set SearchedText(text) {
        if (typeof text === "string") {
            return this.#searchStore.setSearchedText(text);
        }

        throw new Error("Text is invalid. It's must be string.")
    }

    get Rooms() {
        return this.#roomsStore.rooms;
    }

    async update() {
        const splitedText = this.SearchedText.split(" ");
        const tags = splitedText
            .filter(item => item.startsWith("#"))
            .map(item => item.slice(1))
            .filter(item => item)
            .join(",");

        const name = splitedText
            .filter(item => !item.startsWith("#"))
            .join(" ");

        const data = {
            params: { tags, name }
        }

        await this.#roomsStore.update(this.#request, data);
    }

    clear() {
        this.#roomsStore.clear();
        this.#searchStore.setSearchedText("");
    }
}