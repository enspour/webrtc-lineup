import axios from "axios";

class UserAPI {
    /**
     * @param {{ 
     *  params: { id: string }
     * }} data
     * @param {AbortSignal} signal 
     * @returns 
     */
    async findOne(data, signal) {
        return await axios.get(`/api/v1/auth-service/user/${data.params.id}`, {
            signal
        });
    }
}

export default new UserAPI();