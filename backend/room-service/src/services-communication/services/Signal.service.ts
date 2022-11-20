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

    async updateConferenceInformation(conferenceId: string) {
        try {
            const { backend } = serverConfig;
            const url = `${backend}/services-communication/signal-service/users/update-conference-information/${conferenceId}`;

            const response = await fetch(url, { method: "PUT" });
        } catch {}
    }
}

export default new SignalService();