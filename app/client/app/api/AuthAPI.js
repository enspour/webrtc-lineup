import axios from "axios";

class AuthAPI {
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
        return await axios.post("/api/v1/auth-service/auth/login", data.body, {
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
        return await axios.post("/api/v1/auth-service/auth/signup", data.body, {
            signal
        }); 
    }

    async refresh() {
        return await axios.post("/api/v1/auth-service/auth/refresh");
    }

    async me(_, signal) {
        return await axios.get("/api/v1/auth-service/auth/me", {
            signal
        });
    }

    async logout(_, signal) {
        return await axios.post("/api/v1/auth-service/auth/logout", {
            signal
        });
    }
}

export default new AuthAPI();