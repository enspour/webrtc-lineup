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

const themes = new ThemesService();

const localStorage = new Storage();
const sessionStorage = new Storage();

const services = {
    API: new APIService,
    authAPI: new AuthAPIService(),
    
    search: new SearchService(searchStore),
    user: new UserService(userStore),

    themes,

    localStorage,
    sessionStorage,

    initialize: () => {
        themes.initialize();  
        localStorage.initialize("local"),
        sessionStorage.initialize("session")
    }
}

export default services;