import fetch from "node-fetch";

import serverConfig from "@configs/server.config";

class SignalService {
    async updateRoomInformationConnectedUsers(id: bigint) {
        try {
            const { backend } = serverConfig;
            const url = `${backend}/services-communication/signal-service/users/update-room-inforamtion/${id}`;
            
            const response = await fetch(url, { method: "PUT" });
        } catch {}
    }
}

export default new SignalService();