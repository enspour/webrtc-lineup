import axios from "axios";

class ConferenceAPI {
    /**
     * @param {{ 
     *  body: { room_id: string; name: string, description?: string }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async create(data, signal) {
        return await axios.post("/api/v1/room-service/conference/", data.body, { signal });
    }

    /**
     * @param {{ 
     *  params: { id: string }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async delete(data, signal) {
        return await axios.delete(`/api/v1/room-service/conference/${data.params.id}`, { signal });
    }

    /**
     * @param {{ 
     *  body: { 
     *      conference_id: string; 
     *      enable_audio: boolean; 
     *  }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateEnableAudio(data, signal) {
        return await axios.post("/api/v1/room-service/conference/settings/enable_audio", data.body, { signal });
    }

    /**
     * @param {{ 
     *  body: { 
     *      conference_id: string; 
     *      enable_audio: boolean; 
     *  }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateEnableVideo(data, signal) {
        return await axios.post("/api/v1/room-service/conference/settings/enable_video", data.body, { signal });
    }
}

export default new ConferenceAPI();