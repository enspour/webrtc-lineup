import fetch from "node-fetch";

import servicesConfig from "@configs/services.config";

class SignalService {
    async updateRoomInformation(roomId: bigint) {
        try {
            const { signal } = servicesConfig;
            const url = 
                `${signal}/services-communication/signal-service/users/update-room-inforamtion/${roomId}`;
            
            const response = await fetch(url, { method: "PUT" });
        } catch {}
    }

    async updateConferenceInformation(conferenceId: string) {
        try {
            const { signal } = servicesConfig;
            const url = 
                `${signal}/services-communication/signal-service/users/update-conference-information/${conferenceId}`;

            const response = await fetch(url, { method: "PUT" });
        } catch {}
    }
}

export default new SignalService();