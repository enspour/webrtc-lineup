import APIService from "./APIServices/API.service";
import AuthAPI from "./APIServices/AuthAPI.service";
import RoomAPI from "./APIServices/RoomAPI.service";
import RoomSettingsAPI from "./APIServices/RoomSettingsAPI.service";
import RoomsAPI from "./APIServices/RoomsAPI.service";

import RoomInfo from "./RoomInfo.service";

import { IslandService } from "../features/Island";

import User from "./user/User.service";
import Rooms from "./Rooms.service";
import UserDevices from "./user/UserDevices.service";
import UserMedia from "./user/UserMedia.service";

import Search from "./Search.service";
import Modals from "./Modals.service";
import Storage from "./Storage.service";

import Themes from "./Themes.service";

import { 
    Signal, 
    RoomService, 
    ConferenceService, 
} from "@features/room";

const API = new APIService();
const roomAPI = new RoomAPI();
const roomsAPI = new RoomsAPI();
const authAPI = new AuthAPI();

const userDevices = new UserDevices();
const userMedia = new UserMedia(userDevices);

const connectedRoom = new RoomInfo(API.createRequest(roomAPI.getOne));

const signal = new Signal();

const services = {
    API,
    authAPI,
    roomAPI,
    roomsAPI,
    roomSettingsAPI: new RoomSettingsAPI(),
    
    search: new Search(API, roomsAPI),
    modals: new Modals(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),
    
    themes: new Themes(),

    user: new User(API, authAPI),
    userRooms: new Rooms(API.createRequest(roomsAPI.getCreated)),
    userFavoritesRooms: new Rooms(API.createRequest(roomsAPI.getFavorites)),
    userDevices,
    userMedia,

    island: new IslandService(),

    room: new RoomService(signal, connectedRoom),
    conference: new ConferenceService(signal, connectedRoom, userMedia),

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