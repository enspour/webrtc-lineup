import fetch from "node-fetch";

import serverConfig from "@configs/server.config";

class SignalService {
    async updateRoomInformation(roomId: bigint) {
        try {
            const { backend } = serverConfig;
            const url = `${backend}/services-communication/signal-service/users/update-room-inforamtion/${roomId}`;
            
            const response = await fetch(url, { method: "PUT" });
        } catch {}
    }

    async updateConferenceInformation(roomId: string, conferenceId: string) {
        try {
            const { backend } = serverConfig;
            const url = `${backend}/services-communication/signal-service/users/update-conference-information`;

            const response = await fetch(url, { 
                method: "PUT",
                body: JSON.stringify({ room_id: roomId, conference_id: conferenceId }),
                headers: { "Content-Type": "application/json" }
            });
        } catch {}
    }
}

export default new SignalService();