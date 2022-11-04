import axios from "axios";

export default class RoomAPIService {

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
        return await axios.post("/api/v1/room-service/rooms/", data.body, {
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
        return await axios.delete(`/api/v1/room-service/rooms/${data.params.id}`, {
            signal
        });
    }

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
     *      id: string
     *  } 
     * }} data 
     * @param {AbortSignal} signal 
     * @returns 
     */
    async addToFavorites(data, signal) {
        return await axios.post(`/api/v1/room-service/rooms/favorites/${data.params.id}`, {
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
        return await axios.delete(`/api/v1/room-service/rooms/favorites/${data.params.id}`, {
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

    /**
     * @param {{ 
     *  params: { roomId: string }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async getUsersInRoom(data, signal) {
        return await axios.get(
            `/api/v1/signal-service/rooms/${data.params.roomId}/users`, 
            { signal },
        );
    }
}