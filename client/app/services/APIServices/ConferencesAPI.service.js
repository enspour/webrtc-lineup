import axios from "axios";

export default class ConferencesAPIService {
    /**
     * @param {{ 
     *  params: { room_id: string }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async findAll(data, signal) {
        return await axios.get(`/api/v1/room-service/conferences/${data.params.room_id}`, { signal });
    }
}