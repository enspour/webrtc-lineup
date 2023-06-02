import fetch, { Response } from "node-fetch";

import toJson from "core/utils/toJson";

import servicesConfig from "../configs/services.config";

const { chat } = servicesConfig;

class ChatServiceAPI {
    async createMessage(
        conference_id: string, 
        text: string, 
        user: { id: string, name: string }
    ): Promise<Response> {
        const url = `http://${chat}/api/v1/chat-service/private/message`;
    
        const body = toJson({ 
            conference_id,
            text,
            user
        });
    
        return await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        });
    }
}

export default new ChatServiceAPI();