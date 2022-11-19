import { repository } from "core/database/src/connection";

import services from "@socket/services";

class RoomService {
    async findOneByIdWithAuth(roomId: bigint, userId: bigint) {
        return await repository.findRoomByIdWithAuth(roomId, userId);
    }

    async findOneByIdPrivilege(id: bigint) {
        return await repository.findRoomByIdPrivilege(id);
    }

    getUsersIdInRoom(roomId: string) {
        return services.rooms.getClients(roomId).map(item => item.userId);
    }
}

export default new RoomService();