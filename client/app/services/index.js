import APIService from "./APISerivces/API.service";
import AuthAPI from "./APISerivces/AuthAPI.service";
import RoomAPI from "./APISerivces/RoomAPI.service";

import { IslandService } from "../features/Island";

import User from "./user/User.service";
import UserRooms from "./user/UserRooms.service";
import UserFavoritesRooms from "./user/UserFavoritesRooms.service";

import Search from "./Search.service";
import Modals from "./Modals.service";
import Storage from "./Storage.service";

import Themes from "./Themes.service";

import { RoomConnection } from "@features/webRTC";

const API = new APIService();
const roomAPI = new RoomAPI();
const authAPI = new AuthAPI();

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
    userRooms: new UserRooms(API, roomAPI),
    userFavoritesRooms: new UserFavoritesRooms(API, roomAPI),

    island: new IslandService(),

    roomConnection: new RoomConnection(),

    initialize: function () {
        this.localStorage.initialize("local");
        this.sessionStorage.initialize("session");

        this.search.initialize(this.localStorage);
    }
}

export default services;