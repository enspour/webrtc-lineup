import APIService from "./APISerivces/API.service";
import AuthAPI from "./APISerivces/AuthAPI.service";
import RoomAPI from "./APISerivces/RoomAPI.service";

import { IslandService } from "../features/Island";

import User from "./user/User.service";
import UserRooms from "./user/UserRooms.service";
import UserFavoritesRooms from "./user/UserFavoritesRooms.service";
import UserMedia from "./user/UserMedia.service";

import Search from "./Search.service";
import Modals from "./Modals.service";
import Storage from "./Storage.service";

import Themes from "./Themes.service";

import { RoomConnection } from "@features/webRTC";

const cleaners = [];

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
    userMedia: new UserMedia(),

    island: new IslandService(),

    roomConnection: new RoomConnection(),

    initialize: function () {
        this.localStorage.initialize("local");
        this.sessionStorage.initialize("session");

        const searchCleaner = this.search.initialize(this.localStorage);
        const userMediaCleaner = this.userMedia.initialize();

        cleaners.push(searchCleaner);
        cleaners.push(userMediaCleaner);
    },

    destroy: function () {
        for (const cleaner of cleaners) {
            cleaner();
        }
    }
}

export default services;