import { repository } from "core/database/src/connection";

import services from "@socket/services";

class RoomService {
    async findRoomByIdWithAuth(roomId: bigint) {
        return await repository.findRoomByIdWithAuth(roomId)
    }

    getUsersIdInRoom(roomId: string) {
        return services.rooms.getClients(roomId).map(item => item.userId);
    }
}

export default new RoomService();