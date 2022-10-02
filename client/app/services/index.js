import APIService from "./APISerivces/API.service";
import AuthAPIService from "./APISerivces/AuthAPI.service";
import SearchService from "./Search.service";
import UserService from "./User.service";
import ThemesService from "./Themes.service";
import RoomAPIService from "./APISerivces/RoomAPI.service";
import Storage from "./Storage.service";
import UserRoomsService from "./UserRooms.service";

import SearchStore from "@store/Search.store";
import UserStore from "@store/User.store";
import RoomsStore from "@store/Rooms.store";

import IslandService from "../features/Island/Island.service";
import IslandStore from "../features/Island/Island.store";

const API = new APIService();
const roomAPI = new RoomAPIService();

const services = {
    API,
    authAPI: new AuthAPIService(),
    roomAPI,
    
    search: new SearchService(new RoomsStore(), new SearchStore(), API, roomAPI),
    user: new UserService(new UserStore()),

    themes: new ThemesService(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    userRooms: new UserRoomsService(new RoomsStore(), API, roomAPI),

    island: new IslandService(new IslandStore()),

    initialize: function () {
        this.localStorage.initialize("local"),
        this.sessionStorage.initialize("session")
    }
}

export default services;