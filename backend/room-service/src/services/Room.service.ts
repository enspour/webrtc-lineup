import { repository } from "core/database/src/connection";

class RoomService {
    async getRoom(id: bigint) {
        return await repository.findRoomByIdWithSettings(id);
    }
}

export default new RoomService();