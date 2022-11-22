import fetch from "node-fetch";

import { User, Room, RoomSettings, Conference, ConferenceSettings } from "core/database/src/types"; 

import toJson from "core/utils/toJson";

import servicesConfig from "@configs/services.config";

class SignalService {
    async updateRoomInformation(room: (Room & { owner: User, settings: RoomSettings })) {
        try {
            const { signal } = servicesConfig;
            const url = 
                `${signal}/services-communication/signal-service/users/update-room-information/`;
            
            const body = toJson({ room });

            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body
            });
        } catch {}
    }

    async updateConferenceInformation(conference: Conference & { settings: ConferenceSettings }) {
        try {
            const { signal } = servicesConfig;
            const url = 
                `${signal}/services-communication/signal-service/users/update-conference-information/`;

            const body = toJson({ conference });

            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body
            });
        } catch {}
    }
}

export default new SignalService();