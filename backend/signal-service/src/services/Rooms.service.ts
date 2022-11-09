import { repository } from "core/database/src/connection";

import services from "@socket/services";

class RoomsService {
    async findRoomAuthById(roomId: bigint) {
        return await repository.findRoomAuthById(roomId)
    }

    getUsersIdInRoom(roomId: string) {
        return services.rooms.getClients(roomId).map(item => item.userId);
    }
}

export default new RoomsService();