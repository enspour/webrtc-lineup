import axios from "axios";

export default class RoomSettingsAPIService {
    /**
     * @param {{ 
     *  body: { id: string; visibility: boolean; }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateVisibility(data, signal) {
        return await axios.post("/api/v1/room-service/room-settings/visibility", data.body, { signal });
    }

    /**
     * @param {{ 
     *  body: { id: string; enable_audio: boolean; }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateEnableAudio(data, signal) {
        return await axios.post("/api/v1/room-service/room-settings/enable_audio", data.body, { signal });
    }

    /**
     * @param {{ 
     *  body: { id: string; enable_video: boolean; }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async updateEnableVideo(data, signal) {
        return await axios.post("/api/v1/room-service/room-settings/enable_video", data.body, { signal });
    }
}