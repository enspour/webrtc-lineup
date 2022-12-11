import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArrayService from "./RequestedArray.service";

import UserService from "./user/User.service";
import UserDevicesService from "./user/UserDevices.service";
import UserMediaService from "./user/UserMedia.service";

import SearchService from "./Search.service";

import ContextMenuService from "./ContextMenu.service";
import ModalsService from "./Modals.service";
import ThemesService from "./Themes.service";

import StorageService from "./Storage.service";

import { IslandService } from "@features/Island";

import { ConferenceService, RoomService, SignalService } from "@features/Room";

import handlerDataRooms from "@utils/handlersReceivedData/handlerDataRooms";
import { signalLogger } from "@utils/logger";

const user = new UserService();
const userDevices = new UserDevicesService();
const userMedia = new UserMediaService(userDevices);

const signal = new SignalService();

const room = new RoomService(signal);

const services = {
    search: new SearchService(),

    contextMenu: new ContextMenuService(),
    modals: new ModalsService(),
    themes: new ThemesService(),

    localStorage: new StorageService(),
    sessionStorage: new StorageService(),

    user,
    userRooms: new RequestedArrayService(
        API.createRequest(RoomsAPI.findCreatedRooms), 
        handlerDataRooms
    ),
    userFavoritesRooms: new RequestedArrayService(
        API.createRequest(RoomsAPI.findFavoritesRooms), 
        handlerDataRooms
    ),
    userDevices,
    userMedia,

    island: new IslandService(),

    room,
    conference: new ConferenceService(signal, room, user, userMedia),

    initialize: function () {
        this.localStorage.initialize("local");
        this.sessionStorage.initialize("session");

        this.user.initialize();
        this.userDevices.initialize();
        this.userRooms.initialize();
        this.userFavoritesRooms.initialize();

        this.search.initialize(this.localStorage);

        this.room.initialize();
        this.conference.initialize();

        signalLogger(signal)
    }
}

export default services;