import fetch, { Response } from "node-fetch";

import servicesConfig from "../configs/services.config";

const { room } = servicesConfig;

class RoomServiceAPI {
    async findOneWithAuth(roomId: string, userId: string): Promise<Response> {
        return await fetch(
            `http://${room}/api/v1/room-service/private/room/with-auth?id=${roomId}&user_id=${userId}`
        );
    }
}

export default new RoomServiceAPI();