import { autorun } from "mobx";

import RoomsService from "./Rooms.service";

import SearchStore from "@stores/Search.store";

import removeDuplicates from "@utils/removeDuplicates";

export default class SearchService {
    #size = 50;
    #delay = 2000;
    #timeout;

    #rooms;
    #searchStore;

    constructor(api, roomsAPI) {
        const request = api.createRequest(roomsAPI.search);
        this.#rooms = new RoomsService(request);
        this.#searchStore = new SearchStore();
    }

    initialize(localStorage) {
        this.#loadHistory(localStorage);
        
        const destroyRoomsService = this.#rooms.initialize();

        const offSavingHistory = this.#onSavingHistory(localStorage);
        const offPushingInHistory = this.#onPushingInHistory();

        return () => {
            destroyRoomsService();

            offSavingHistory();
            offPushingInHistory();
        }
    }

    get History() {
        return this.#searchStore.history;
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
        return this.#rooms.Rooms;
    }

    get State() {
        return this.#rooms.State;
    }

    pushHistoryItem(text) {
        this.removeHistoryItem(text);

        this.#searchStore.setHistory([text, ...this.History])

        while (this.History.length > this.#size) {
            this.#searchStore.setHistory(this.History.slice(0, this.History.length - 1))
        }
    }

    removeHistoryItem(text) {
        const index = this.History.findIndex(item => item === text);
        if (index !== -1) {
            this.#searchStore.setHistory([...this.History.slice(0, index), ...this.History.slice(index + 1)])
        }
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

        await this.#rooms.update(data);
    }

    clear() {
        this.#rooms.clear();
    }

    #loadHistory(localStorage) {
        const history = localStorage.get("__history") || [];
        this.#searchStore.setHistory(removeDuplicates(history));
    }

    #onSavingHistory(localStorage) {
        return autorun(() => {
            const history = this.#searchStore.history;
            localStorage.set("__history", history);
        })
    }

    #onPushingInHistory() {
        return autorun(() => {
            if (this.SearchedText) {
                clearTimeout(this.#timeout);
                this.#timeout = setTimeout(() => this.pushHistoryItem(this.SearchedText), this.#delay)
            } else {
                clearTimeout(this.#timeout);
            }
        })
    }
}