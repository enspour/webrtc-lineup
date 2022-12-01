import APIService from "./APIServices/API.service";
import AuthAPI from "./APIServices/AuthAPI.service";
import RoomAPI from "./APIServices/RoomAPI.service";
import RoomsAPI from "./APIServices/RoomsAPI.service";
import ConferenceAPI from "./APIServices/ConferenceAPI.service";
import ConferencesAPI from "./APIServices/ConferencesAPI.service";

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

const API = new APIService();
const roomAPI = new RoomAPI();
const roomsAPI = new RoomsAPI();
const authAPI = new AuthAPI();
const conferenceAPI = new ConferenceAPI();
const conferencesAPI = new ConferencesAPI();

const userDevices = new UserDevices();
const userMedia = new UserMedia(userDevices);

const signal = new SignalService();

const room = new RoomService(signal, API, roomAPI, conferencesAPI);

const services = {
    API,
    authAPI,
    roomAPI,
    roomsAPI,
    conferenceAPI,
    conferencesAPI,
    
    search: new Search(API, roomsAPI),

    contextMenu: new ContextMenu(),
    modals: new Modals(),
    themes: new Themes(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    user: new User(API, authAPI),
    userRooms: new RequestedArray(API.createRequest(roomsAPI.findCreatedRooms), handlerDataRooms),
    userFavoritesRooms: new RequestedArray(API.createRequest(roomsAPI.findFavoritesRooms), handlerDataRooms),
    userDevices,
    userMedia,

    island: new IslandService(),

    room,
    conference: new ConferenceService(signal, room, userMedia),

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
    }
}

export default services;