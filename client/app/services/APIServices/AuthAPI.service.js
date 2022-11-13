import axios from "axios";

export default class AuthAPIService {
    /**
     * @param {{ 
     *  body: {
     *      email: string, 
     *      password: string, 
     *      remember_me: boolean 
     *  }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async login(data, signal) {
        return await axios.post("/api/v1/auth-service/login", data.body, {
            signal
        });
    }

    /**
     * @param {{
     *  body: { 
     *      name: string,
     *      email: string, 
     *      password: string,
     *      remember_me: boolean
     *  }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
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

    async logout(_, signal) {
        return await axios.post("/api/v1/auth-service/logout", {
            signal
        });
    }
}