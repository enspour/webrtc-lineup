import APIService from "./APISerivces/API.service";
import AuthAPIService from "./APISerivces/AuthAPI.service";
import SearchService from "./Search.service";
import UserService from "./User.service";
import ThemesService from "./Themes.service";
import RoomAPIService from "./APISerivces/RoomAPI.service";
import UserRoomsService from "./UserRooms.service";
import IslandService from "../features/Island/Island.service";
import FavoritesRoomsService from "./FavoritesRooms.service";

import Storage from "./Storage.service";


const API = new APIService();
const roomAPI = new RoomAPIService();

const services = {
    API,
    authAPI: new AuthAPIService(),
    roomAPI,
    
    search: new SearchService(API, roomAPI),
    user: new UserService(),

    themes: new ThemesService(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    userRooms: new UserRoomsService(API, roomAPI),
    favoritesRooms: new FavoritesRoomsService(API, roomAPI),

    island: new IslandService(),

    initialize: function () {
        this.localStorage.initialize("local"),
        this.sessionStorage.initialize("session")
    }
}

export default services;