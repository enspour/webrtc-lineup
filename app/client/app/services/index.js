import { io } from "socket.io-client"

import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "./RequestedArray.service";
import ContextMenuService from "./ContextMenu.service";
import ModalsService from "./Modals.service";
import StorageService from "./Storage.service";

import { IslandService, SearchService } from "@features/island";
import { UserService } from "@features/user";
import { RoomService, transformToRooms } from "@features/room";
import { ConferenceService, ConferenceWorkflowService } from "@features/conference";
import { NotificationService } from "@features/notifications";

const socket = io({ 
    path: "/api/v1/signal-service/socket/socket.io", 
    autoConnect: false
});

class Services {
    constructor() {
        this.localStorage = new StorageService(this);
        this.sessionStorage = new StorageService(this);

        this.search = new SearchService(this);
        this.island = new IslandService(this);

        this.contextMenu = new ContextMenuService(this);
        this.modals = new ModalsService(this);

        this.user = new UserService(this);

        this.userCreatedRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findCreatedRooms), 
            (data) => transformToRooms(data.body.rooms)
        );

        this.userFavoritesRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findFavoritesRooms), 
            (data) => transformToRooms(data.body.rooms)
        );
        
        this.room = new RoomService(this, socket);
        this.conference = new ConferenceService(this, socket);

        this.notification = new NotificationService(this);
    }

    initialize() {
        const localStorageDestroyer = this.localStorage.initialize("local");
        const sessionStorageDestroyer = this.sessionStorage.initialize("session");

        const searchDestroyer = this.search.initialize();

        const userDestroyer = this.user.initialize();

        const userCreatedRoomsDestroyer = this.userCreatedRooms.initialize();
        const userFavoritesRoomsDestroyer = this.userFavoritesRooms.initialize();

        const roomDestroyer = this.room.initialize();

        const conferenceDestroyer = this.conference.initialize();

        return () => {
            localStorageDestroyer();
            sessionStorageDestroyer();

            searchDestroyer();

            userDestroyer();

            userCreatedRoomsDestroyer();
            userFavoritesRoomsDestroyer();

            roomDestroyer();
            conferenceDestroyer();
        }
    }
}

export default new Services();