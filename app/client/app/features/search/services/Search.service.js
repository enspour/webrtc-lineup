import { autorun } from "mobx";

import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "@services/RequestedArray.service";

import SearchStore from "../store/Search.store";

import { transformToRooms } from "@features/room";

import removeDuplicates from "@utils/removeDuplicates";

export default class SearchService {
    #size = 50;
    #delay = 2000;
    #timeout;

    #localStorage;

    #requestedRooms;
    #search;

    constructor({ localStorage }) {
        this.#localStorage = localStorage;

        this.#requestedRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.search), 
            (data) => transformToRooms(data.body.rooms)
        );

        this.#search = new SearchStore();
    }

    initialize() {
        this.#loadHistory();
        
        const destroyRoomsService = this.#requestedRooms.initialize();

        const offSavingHistory = this.#onSavingHistory();
        const offPushingInHistory = this.#onPushingInHistory();

        return () => {
            destroyRoomsService();

            offSavingHistory();
            offPushingInHistory();
        }
    }

    get History() {
        return this.#search.history;
    }

    get SearchedText() {
        return this.#search.searchedText;
    }

    set SearchedText(text) {
        if (typeof text === "string") {
            return this.#search.setSearchedText(text);
        }

        throw new Error("Text is invalid. It's must be string.")
    }

    get Rooms() {
        return this.#requestedRooms.Array;
    }

    get Status() {
        return this.#requestedRooms.Status;
    }

    pushHistoryItem(text) {
        this.removeHistoryItem(text);

        this.#search.setHistory([text, ...this.History])

        while (this.History.length > this.#size) {
            this.#search.setHistory(this.History.slice(0, this.History.length - 1))
        }
    }

    removeHistoryItem(text) {
        const index = this.History.findIndex(item => item === text);
        if (index !== -1) {
            this.#search.setHistory([...this.History.slice(0, index), ...this.History.slice(index + 1)])
        }
    }

    async update() {
        const separatedText = this.SearchedText.split(" ");
        const tags = separatedText
            .filter(item => item.startsWith("#"))
            .map(item => item.slice(1).toLowerCase())
            .filter(item => item)
            .join(",");

        const words = separatedText
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

    #loadHistory() {
        const history = this.#localStorage.get("__history") || [];
        this.#search.setHistory(removeDuplicates(history));
    }

    #onSavingHistory() {
        return autorun(() => {
            const history = this.#search.history;
            this.#localStorage.set("__history", history);
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