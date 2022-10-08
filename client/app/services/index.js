import APIService from "./APISerivces/API.service";
import AuthAPI from "./APISerivces/AuthAPI.service";
import Search from "./Search.service";
import User from "./User.service";
import Themes from "./Themes.service";
import RoomAPI from "./APISerivces/RoomAPI.service";
import UserRooms from "./UserRooms.service";
import Island from "../features/Island/Island.service";
import FavoritesRooms from "./FavoritesRooms.service";
import Storage from "./Storage.service";
import Connection from "./Connection.service";
import Modals from "./Modals.service";


const API = new APIService();
const roomAPI = new RoomAPI();

const services = {
    API,
    authAPI: new AuthAPI(),
    roomAPI,
    
    search: new Search(API, roomAPI),
    user: new User(),

    themes: new Themes(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    userRooms: new UserRooms(API, roomAPI),
    favoritesRooms: new FavoritesRooms(API, roomAPI),

    island: new Island(),

    connection: new Connection(),
    
    modals: new Modals(),

    initialize: function () {
        this.localStorage.initialize("local"),
        this.sessionStorage.initialize("session")
    }
}

export default services;