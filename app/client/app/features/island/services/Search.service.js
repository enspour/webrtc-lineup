import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "@services/RequestedArray.service";
import SearchHistoryService from "./SearchHistory.service";

import SearchStore from "../stores/Search.store";

import { transformToRooms } from "@features/room";

export default class SearchService {
    #requestedRooms;
    
    #searchStore;
    #searchHistory;

    constructor(localStorage) {
        this.#requestedRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.search), 
            (data) => transformToRooms(data.body.rooms)
        );

        this.#searchStore = new SearchStore();
        
        this.#searchHistory = new SearchHistoryService(localStorage, this.#searchStore);
    }

    initialize() {
        const requestedRoomsDestroyer = this.#requestedRooms.initialize();
        const searchHistoryDestroyer = this.#searchHistory.initialize();

        return () => {
            requestedRoomsDestroyer();
            searchHistoryDestroyer();
        }
    }

    get History() {
        return this.#searchHistory;
    }

    get Text() {
        return this.#searchStore.text;
    }

    set Text(text) {
        if (typeof text === "string") {
            return this.#searchStore.setText(text);
        }

        throw new Error("Text is invalid. It's must be string.")
    }

    get Rooms() {
        return this.#requestedRooms.Array;
    }

    get Status() {
        return this.#requestedRooms.Status;
    }

    async update() {
        const splitText = this.Text.split(" ");
        const tags = splitText
            .filter(item => item.startsWith("#"))
            .map(item => item.slice(1).toLowerCase())
            .filter(item => item)
            .join(",");

        const words = splitText
            .filter(item => !item.startsWith("#"))
            .filter(item => item)
            .join(",");

        const data = {
            params: { tags, words }
        }

        await this.#requestedRooms.update(data);
    }

    clear() {
        this.#requestedRooms.clear();
    }
}