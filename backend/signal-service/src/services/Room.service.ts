import { repository } from "core/database/src/connection";

import services from "@socket/services";

class RoomService {
    async findRoomByIdWithAuthSettings(roomId: bigint) {
        return await repository.findRoomByIdWithAuthSettings(roomId)
    }

    getUsersIdInRoom(roomId: string) {
        return services.rooms.getClients(roomId).map(item => item.userId);
    }
}

export default new RoomService();