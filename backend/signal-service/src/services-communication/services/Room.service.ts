import fetch from "node-fetch";

import servicesConfig from "@configs/services.config";

class RoomService {
    async findOneWithAuth(roomId: string, userId: string) {
        const { room } = servicesConfig;
        
        const response = await fetch(
            `${room}/services-communication/room-service/room/with-auth?id=${roomId}&user_id=${userId}`
        );

        if (response.status === 200) {
            const data = await response.json();
            return data.body.room;
        }

        return null;
    }
}

export default new RoomService();