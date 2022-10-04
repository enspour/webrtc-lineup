import RoomsStore from "@store/Rooms.store";
import SearchStore from "@store/Search.store";

export default class SearchService {
    #roomsStore;
    #searchStore;

    constructor(api, roomAPI) {
        const request = api.createRequest(roomAPI.search);
        this.#roomsStore = new RoomsStore(request);
        this.#searchStore = new SearchStore();
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

    get State() {
        return this.#roomsStore.state;
    }

    async update() {
        const splitedText = this.SearchedText.split(" ");
        const tags = splitedText
            .filter(item => item.startsWith("#"))
            .map(item => item.slice(1).toLowerCase())
            .filter(item => item)
            .join(",");

        const words = splitedText
            .filter(item => !item.startsWith("#"))
            .filter(item => item)
            .join(",");

        const data = {
            params: { tags, words }
        }

        await this.#roomsStore.update(data);
    }

    clear() {
        this.#roomsStore.clear();
    }
}