import fetch from "node-fetch";

import logger from "@logger";

import servicesConfig from "@configs/services.config";

class RoomService {
    async findOneWithAuth(roomId: string, userId: string) {
        try {
            const { room } = servicesConfig;
        
            const response = await fetch(
                `http://${room}/services-communication/room-service/room/with-auth?id=${roomId}&user_id=${userId}`
            );
    
            if (response.status === 200) {
                const data = await response.json();
                return data.body.room;
            }
    
            return null;
        } catch (e) {
            logger.log(`Error send to ChatService: ${e}`);
        }
    }
}

export default new RoomService();