import { repository } from "core/database/src/connection";

class RoomsService {
    async create(name: string, password: string, ownerId: bigint, tags: string[]) {
        return await repository.createRoom(name, password, ownerId, tags);
    }

    async delete(id: bigint, ownerId: bigint) {
        const room = await repository.findRoomById(id);

        if (room && room.owner_id === ownerId) {
            return await repository.deleteRoom(id);
        }

        return null;
    }

    async getCreatedRooms(userId: bigint) {
        return await repository.findUserRooms(userId);
    }
}

export default new RoomsService();