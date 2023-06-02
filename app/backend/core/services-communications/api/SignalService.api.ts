import fetch from "node-fetch";

import { User, Room, RoomSettings, Conference, ConferenceSettings } from "postgresql/src/types"; 

import toJson from "core/utils/toJson";

import servicesConfig from "../configs/services.config";

const { signal } = servicesConfig;

class SignalServiceAPI {
    async updateRoomInformation(room: (Room & { owner: User, settings: RoomSettings })) {
        const url = 
            `http://${signal}/api/v1/signal-service/private/users/update-room-information/`;
        
        const body = toJson({ room });

        return await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body
        });
    }

    async updateConferenceInformation(roomId: string, conference: Conference & { settings: ConferenceSettings }) {
        const url = 
            `http://${signal}/api/v1/signal-service/private/users/update-conference-information/`;

        const body = toJson({ room_id: roomId, conference });

        return await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body
        });
    }
}

export default new SignalServiceAPI();