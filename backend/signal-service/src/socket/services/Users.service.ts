import { User, Room, RoomSettings } from "core/database/src/types"

import BroadcastAll from "@socket/notifications/BroadcastAll.notification"

import { RoomActionsTypes } from "@socket/types"

export default class UsersService {
    updateRoomInformation(id: string, room: (Room & { owner: User, settings: RoomSettings })) {
        const data = 
            JSON.parse(JSON.stringify(
                room,
                (_, value) => typeof value === "bigint" 
                    ? value.toString() 
                    : value
            ));

        new BroadcastAll(RoomActionsTypes.NOTIFY_UPDATE_ROOM_INFORMATION, { room: data }).notify(id);
    }
}
