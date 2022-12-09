import { autorun } from "mobx";

import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArray from "./RequestedArray.service";

import StateStore from "@stores/State.store";
import SearchStore from "@stores/Search.store";

import handlerDataRooms from "@utils/handlersReceivedData/handlerDataRooms";
import removeDuplicates from "@utils/removeDuplicates";

export default class SearchService {
    #size = 50;
    #delay = 2000;
    #timeout;

    #requestedRooms;
    #requestedRoomsState;
    #search;

    constructor() {
        this.#requestedRooms = new RequestedArray(API.createRequest(RoomsAPI.search), handlerDataRooms);
        this.#requestedRoomsState = new StateStore();
        this.#search = new SearchStore();
    }

    initialize(localStorage) {
        this.#loadHistory(localStorage);
        
        const destroyRoomsService = this.#requestedRooms.initialize();

        const offSavingHistory = this.#onSavingHistory(localStorage);
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

    get State() {
        return this.#requestedRoomsState.State;
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

        await this.#requestedRooms.update(data);
    }

    clear() {
        this.#requestedRooms.clear();
    }

    #loadHistory(localStorage) {
        const history = localStorage.get("__history") || [];
        this.#search.setHistory(removeDuplicates(history));
    }

    #onSavingHistory(localStorage) {
        return autorun(() => {
            const history = this.#search.history;
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