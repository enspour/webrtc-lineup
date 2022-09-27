import APIService from "./APISerivces/API.service";
import AuthAPIService from "./APISerivces/AuthAPI.service";
import SearchService from "./Search.service";
import UserService from "./User.service";
import ThemesService from "./Themes.service";

import SearchStore from "@store/Search.store";
import UserStore from "@store/User.store";
import Storage from "./Storage";

const searchStore = new SearchStore();
const userStore = new UserStore();

const services = {
    API: new APIService,
    authAPI: new AuthAPIService(),
    
    search: new SearchService(searchStore),
    user: new UserService(userStore),

    themes: new ThemesService(),

    localStorage: new Storage(),
    sessionStorage: new Storage(),

    initialize: function () {
        this.themes.initialize();  
        this.localStorage.initialize("local"),
        this.sessionStorage.initialize("session")
    }
}

export default services;