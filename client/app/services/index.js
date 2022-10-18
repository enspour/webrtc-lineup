import APIService from "./APISerivces/API.service";
import AuthAPI from "./APISerivces/AuthAPI.service";
import RoomAPI from "./APISerivces/RoomAPI.service";

import { IslandService } from "../features/Island";

import Search from "./Search.service";
import User from "./User.service";
import UserRooms from "./UserRooms.service";
import FavoritesRooms from "./FavoritesRooms.service";
import Themes from "./Themes.service";

import Storage from "./Storage.service";
import Modals from "./Modals.service";

import Signal from "../features/webRTC/services/SignalService/Signal.service";

const API = new APIService();
const roomAPI = new RoomAPI();
const authAPI = new AuthAPI();

const services = {
    API,
    authAPI,
    roomAPI,
    
    search: new Search(API, roomAPI),
    user: new User(API, authAPI),

    themes: new Themes(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    userRooms: new UserRooms(API, roomAPI),
    favoritesRooms: new FavoritesRooms(API, roomAPI),

    island: new IslandService(),

    signal: new Signal(),
    
    modals: new Modals(),

    initialize: function () {
        this.localStorage.initialize("local");
        this.sessionStorage.initialize("session");

        this.search.initialize(this.localStorage);
    }
}

export default services;