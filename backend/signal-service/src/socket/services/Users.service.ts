import { User, Room, RoomSettings, Conference, ConferenceSettings } from "core/database/src/types"

import BroadcastAll from "@socket/notifications/BroadcastAll.notification"

import { RoomActionsTypes } from "@socket/types"

export default class UsersService {
    updateRoomInformation(roomId: string, room: (Room & { owner: User, settings: RoomSettings })) {
        const data = 
            JSON.parse(JSON.stringify(
                room,
                (_, value) => typeof value === "bigint" 
                    ? value.toString() 
                    : value
            ));

        new BroadcastAll(RoomActionsTypes.NOTIFY_UPDATE_ROOM_INFORMATION, { room: data }).notify(roomId);
    }

    updateConferenceInformation(roomId: string, conference: (Conference & { settings: ConferenceSettings })) {
        const data = 
            JSON.parse(JSON.stringify(
                conference,
                (_, value) => typeof value === "bigint" 
                    ? value.toString() 
                    : value
            ));

        new BroadcastAll(
            RoomActionsTypes.NOTIFY_UPDATE_CONFERENCE_INFORMATION, 
            { conference: data }
        ).notify(roomId);
    }
}
