import { repository } from "core/database/src/connection";

class RoomService {
    async findRoomWithSettingsById(id: bigint) {
        return await repository.findRoomWithSettingsById(id)
    }
}

export default new RoomService();