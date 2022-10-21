import { repository } from "core/database/src/connection";

import stores from "@socket/stores";

class RoomService {
    async findRoomWithSettingsById(roomId: bigint) {
        return await repository.findRoomWithSettingsById(roomId)
    }

    getUsersInRoom(roomId: string) {
        return stores.rooms.getUserIds(roomId);
    }
}

export default new RoomService();