import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "./RequestedArray.service";

import { 
    UserService, 
    UserDevicesService, 
    UserMediaService 
} from "../features/User";

import { SearchService } from "../features/Search";

import ContextMenuService from "./ContextMenu.service";
import ModalsService from "./Modals.service";
import ThemesService from "./Themes.service";

import StorageService from "./Storage.service";

import { IslandService } from "@features/Island";

import { ConferenceService, RoomService, SignalService } from "@features/Room";

import handlerDataRooms from "@utils/handlersReceivedData/handlerDataRooms";

import SignalLogger from "@logs/Signal.logger";

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
            handlerDataRooms
        );

        this.userFavoritesRooms = new RequestedArrayService(
            API.createRequest(RoomsAPI.findFavoritesRooms), 
            handlerDataRooms
        );

        this.island = new IslandService(this);
        
        this.signal = new SignalService(this);
        this.room = new RoomService(this);
        this.conference = new ConferenceService(this);
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

        SignalLogger.initialize(this.signal);
    }
}

export default new Services();