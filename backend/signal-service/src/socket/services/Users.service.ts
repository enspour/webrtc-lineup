import { User, Room, RoomSettings, Conference, ConferenceSettings } from "core/database/src/types"

import BroadcastAll from "@socket/notifications/BroadcastAll.notification"

import { RoomActionsTypes } from "@socket/types"

import toJson from "core/utils/toJson";

export default class UsersService {
    updateRoomInformation(room: (Room & { owner: User, settings: RoomSettings })) {
        const roomId = room.id.toString();
        
        const data = JSON.parse(toJson(room));

        new BroadcastAll(RoomActionsTypes.NOTIFY_UPDATE_ROOM_INFORMATION, { room: data }).notify(roomId);
    }

    updateConferenceInformation(conference: (Conference & { settings: ConferenceSettings })) {
        const [roomId] = conference.id.split("|");
        
        const data = JSON.parse(toJson(conference));

        new BroadcastAll(
            RoomActionsTypes.NOTIFY_UPDATE_CONFERENCE_INFORMATION, 
            { conference: data }
        ).notify(roomId);
    }
}
