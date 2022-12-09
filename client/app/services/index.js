import API from "@api/API";
import RoomsAPI from "@api/RoomsAPI";

import RequestedArray from "./RequestedArray.service";

import User from "./user/User.service";
import UserDevices from "./user/UserDevices.service";
import UserMedia from "./user/UserMedia.service";

import Search from "./Search.service";

import ContextMenu from "./ContextMenu.service";
import Modals from "./Modals.service";
import Themes from "./Themes.service";

import Storage from "./Storage.service";

import { IslandService } from "@features/Island";

import { ConferenceService, RoomService, SignalService } from "@features/Room";

import handlerDataRooms from "@utils/handlersReceivedData/handlerDataRooms";
import { signalLogger } from "@utils/logger";

const user = new User();
const userDevices = new UserDevices();
const userMedia = new UserMedia(userDevices);

const signal = new SignalService();

const room = new RoomService(signal);

const services = {
    search: new Search(),

    contextMenu: new ContextMenu(),
    modals: new Modals(),
    themes: new Themes(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    user,
    userRooms: new RequestedArray(API.createRequest(RoomsAPI.findCreatedRooms), handlerDataRooms),
    userFavoritesRooms: new RequestedArray(API.createRequest(RoomsAPI.findFavoritesRooms), handlerDataRooms),
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