import axios from "axios";

export default class AuthAPIService {
    async login(data, signal) {
        return await axios.post("/api/v1/auth-service/login", data.body, {
            signal
        });
    }

    async signup(data, signal) {
        return await axios.post("/api/v1/auth-service/signup", data.body, {
            signal
        }); 
    }

    async refresh() {
        return await axios.post("/api/v1/auth-service/refresh");
    }

    async me(_, signal) {
        return await axios.get("/api/v1/auth-service/me", {
            signal
        });
    }
}