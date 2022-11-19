import axios from "axios";

export default class RoomAPIService {
    /**
     * @param {{ 
     *  params: { id: string }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async findOne(data, signal) {
        return await axios.get(`/api/v1/room-service/room/${data.params.id}`, {
            signal,
        });
    }

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
        return await axios.post("/api/v1/room-service/room/", data.body, {
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
        return await axios.delete(`/api/v1/room-service/room/${data.params.id}`, {
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
        return await axios.post(`/api/v1/room-service/room/favorites/${data.params.id}`, {
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
        return await axios.delete(`/api/v1/room-service/room/favorites/${data.params.id}`, {
            signal
        });
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
            `/api/v1/signal-service/room/${data.params.roomId}/users`, 
            { signal },
        );
    }

    /**
     * @param {{ 
     *  body: { id: string; name: string; }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateName(data, signal) {
        return await axios.post("/api/v1/room-service/room/name", data.body, { signal });
    }

    /**
     * @param {{ 
     *  body: { id: string; visibility: boolean; }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateVisibility(data, signal) {
        return await axios.post("/api/v1/room-service/room/settings/visibility", data.body, { signal });
    }
}