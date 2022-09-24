import APIService from "./APISerivces/API.service";
import AuthAPIService from "./APISerivces/AuthAPI.service";
import SearchService from "./Search.service";

import SearchStore from "@store/Search.store";

const searchStore = new SearchStore();

const services = {
    API: new APIService,
    authAPI: new AuthAPIService(),
    
    search: new SearchService(searchStore)
}

export default services;