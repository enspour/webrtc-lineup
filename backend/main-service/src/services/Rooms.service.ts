import { repository } from "core/database/src/connection";

class RoomsService {
    async create(name: string, password: string, owner_id: bigint, tags: string[]) {
        return await repository.createRoom(name, password, owner_id, tags);
    }

    async delete(id: bigint, owner_id: bigint) {
        const room = await repository.findRoomById(id);

        if (room && room.owner_id === owner_id) {
            return await repository.deleteRoom(id);
        }

        return null;
    }
}

export default new RoomsService();