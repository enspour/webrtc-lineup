import axios from "axios";

import APIService from "./API.service";

export default class AuthAPIService extends APIService {
    createLoginRequest() { 
        const makeRequest = (data, signal) => 
            axios.post("/api/v1/auth-service/login", data.body, {
                signal
            });

        return this.createRequest(makeRequest);
    }

    createSignupRequest() { 
        const makeRequest = (data, signal) => 
            axios.post("/api/v1/auth-service/signup", data.body, {
                signal
            }); 

        return this.createRequest(makeRequest);
    }

    async refresh() {
        return await axios.post("/api/v1/auth-service/refresh");
    }
}