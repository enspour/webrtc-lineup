import fetch from "node-fetch";

import toJson from "core/utils/toJson";

import logger from "@logger";

import servicesConfig from "@configs/services.config";

class ChatService {
    async createMessage(conference_id: string, text: string, user: { id: string, name: string }) {
        try {
            const { chat } = servicesConfig;
        
            const url = `${chat}/services-communication/chat-service/message`;
    
            const body = toJson({ 
                conference_id,
                text,
                user
            })
    
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (response.status === 200) {
                const data = await response.json();
                return data.body.message;
            }
    
            return null;
        } catch (e) {
            logger.log(`Error send to ChatService: ${e}`);
        }
    }
}

export default new ChatService();