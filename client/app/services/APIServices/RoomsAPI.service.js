import axios from "axios";

export default class RoomsAPIService {
    async getCreated(_, signal) {
        return await axios.get("/api/v1/room-service/rooms", {
            signal
        });
    }

    async getFavorites(_, signal) {
        return await axios.get("/api/v1/room-service/rooms/favorites", {
            signal
        });
    }

    /**
     * @param {{
     *  params: {
     *      name: string,
     *      tags: string[]
     *  } 
     * }} data 
     * @param {AbortSignal} signal 
     * @returns 
     */
    async search(data, signal) {
        return await axios.get(`/api/v1/room-service/rooms/search`, {
            params: data.params,
            signal
        })
    }
}