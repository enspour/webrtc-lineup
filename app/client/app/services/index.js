import { io } from "socket.io-client"

import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "./RequestedArray.service";
import ContextMenuService from "./ContextMenu.service";
import ModalsService from "./Modals.service";
import ThemesService from "./Themes.service";
import StorageService from "./Storage.service";

import { 
    UserService, 
    UserDevicesService, 
    UserMediaService 
} from "../features/user";
import { SearchService } from "../features/search";
import { RoomService, transformToRooms } from "@features/room";
import { IslandService } from "@features/island";
import { ConferenceService } from "@features/conference";
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

        this.contextMenu = new ContextMenuService(this);
        this.modals = new ModalsService(this);
        this.themes = new ThemesService(this);

        this.user = new UserService(this);
        this.userDevices = new UserDevicesService(this);
        this.userMedia = new UserMediaService(this);

        this.userRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findCreatedRooms), 
            (data) => transformToRooms(data.body.rooms)
        );

        this.userFavoritesRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findFavoritesRooms), 
            (data) => transformToRooms(data.body.rooms)
        );

        this.island = new IslandService(this);
        
        this.room = new RoomService(this, socket);
        this.conference = new ConferenceService(this, socket);

        this.notification = new NotificationService(this);
    }

    initialize() {
        this.localStorage.initialize("local");
        this.sessionStorage.initialize("session");

        this.themes.initialize(this.localStorage);

        this.search.initialize();

        this.user.initialize();
        this.userDevices.initialize();
        this.userMedia.initialize(this.localStorage);

        this.userRooms.initialize();
        this.userFavoritesRooms.initialize();

        this.room.initialize();
        this.conference.initialize();
    }
}

export default new Services();