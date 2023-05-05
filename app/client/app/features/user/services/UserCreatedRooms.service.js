import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "@services/RequestedArray.service";

import { transformToRooms } from "@features/room";

export default class UserCreatedRoomsService {
    #rooms;

    constructor() {
        this.#rooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findCreatedRooms), 
            (data) => transformToRooms(data.body.rooms)
        );
    }

    initialize() {
        const roomsDestroyer = this.#rooms.initialize();

        this.update();

        return () => {
            this.#clear();

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

    #clear() {
        this.#rooms.clear();
    }
}