import { User, Room, RoomSettings, Conference, ConferenceSettings } from "postgresql/src/types"

import BroadcastAll from "@socket/notifications/BroadcastAll.notification"

import { RoomActionsTypes, ConferenceActionsTypes } from "@socket/types"

import toJson from "core/utils/toJson";

export default class UsersService {
    updateRoomInformation(room: (Room & { owner: User, settings: RoomSettings })) {
        const roomId = room.id.toString();
        
        const data = JSON.parse(toJson(room));

        new BroadcastAll(RoomActionsTypes.NOTIFY_ROOM_INFO_UPDATED, { room: data }).notify(roomId);
    }

    updateConferenceInformation(roomId: string, conference: (Conference & { settings: ConferenceSettings })) {
        const data = JSON.parse(toJson(conference));

        new BroadcastAll(
            ConferenceActionsTypes.NOTIFY_CONFERENCE_INFO_UPDATED, 
            { conference: data }
        ).notify(roomId);
    }
}
