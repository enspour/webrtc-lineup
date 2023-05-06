import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "@services/RequestedArray.service";

import { transformToRooms } from "@features/room";

export default class UserFavoritesRoomsService {
    #rooms;

    constructor() {
        this.#rooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findFavoritesRooms), 
            (data) => transformToRooms(data.body.rooms)
        );
    }

    initialize() {
        const roomsDestroyer = this.#rooms.initialize();

        return () => {
            roomsDestroyer();
        }
    }

    get Rooms() {
        return this.#rooms.Array;
    }

    get Status() {
        return this.#rooms.Status;
    }

    async update() {
        await this.#rooms.update();
    }

    clear() {
        this.#rooms.clear();
    }
}