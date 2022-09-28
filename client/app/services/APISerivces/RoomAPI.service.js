import axios from "axios";

export default class RoomAPI {

    /**
     * @param {{ 
     *  body: {
     *      name: string, 
     *      password: string, 
     *      tags: string[] 
     *  }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async create(data, signal) {
        return await axios.post("/api/v1/main-service/rooms/", data.body, {
            signal
        });
    }

    /**
     * @param {{
     *  params: {
     *      id: string
     *  } 
     * }} data 
     * @param {AbortSignal} signal 
     * @returns 
     */
    async delete(data, signal) {
        return await axios.delete(`/api/v1/main-service/rooms/${data.params.id}`, {
            signal
        });
    }

    async getCreated(_, signal) {
        return await axios.get("/api/v1/main-service/rooms", {
            signal
        });
    }

    async getFavorites(_, signal) {
        return await axios.get("/api/v1/main-service/rooms/favorites", {
            signal
        });
    }

    /**
     * @param {{
     *  params: {
     *      id: string
     *  } 
     * }} data 
     * @param {AbortSignal} signal 
     * @returns 
     */
    async addToFavorites(data, signal) {
        return await axios.post(`/api/v1/main-service/rooms/favorites/${data.params.id}`, {
            signal
        });
    }

    /**
     * @param {{
     *  params: {
     *      id: string
     *  } 
     * }} data 
     * @param {AbortSignal} signal 
     * @returns 
     */
    async deleteFromFavorites(data, signal) {
        return await axios.delete(`/api/v1/main-service/rooms/favorites/${data.params.id}`, {
            signal
        });
    }
}