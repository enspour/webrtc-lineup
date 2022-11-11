import APIService from "./APISerivces/API.service";
import AuthAPI from "./APISerivces/AuthAPI.service";
import RoomAPI from "./APISerivces/RoomAPI.service";

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
const authAPI = new AuthAPI();

const userDevices = new UserDevices();
const userMedia = new UserMedia(userDevices);

const signal = new Signal();

const services = {
    API,
    authAPI,
    roomAPI,
    
    search: new Search(API, roomAPI),
    modals: new Modals(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),
    
    themes: new Themes(),

    user: new User(API, authAPI),
    userRooms: new Rooms(API.createRequest(roomAPI.getCreated)),
    userFavoritesRooms: new Rooms(API.createRequest(roomAPI.getFavorites)),
    userDevices,
    userMedia,

    island: new IslandService(),

    room: new RoomService(signal),
    conference: new ConferenceService(signal, userMedia),

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