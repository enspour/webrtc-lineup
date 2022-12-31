import axios from "axios";

class MessagesAPI {
    /**
     * @param {{ params: { conference_id: string }}} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async findAll(data, signal) {
        return await axios.get(`/api/v1/chat-service/messages/${data.params.conference_id}`, { signal });
    }
}

export default new MessagesAPI()