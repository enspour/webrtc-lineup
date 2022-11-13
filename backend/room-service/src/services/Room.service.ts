import { repository } from "core/database/src/connection";

class RoomService {
    async getRoom(id: bigint, userId: bigint) {
        return await repository.findRoomById(id, userId);
    }

    async create(name: string, password: string, userId: bigint, tags: string[]) {
        return await repository.createRoom(name, password, userId, tags);
    }

    async delete(id: bigint, userId: bigint) {
        return await repository.deleteRoom(id, userId);
    }

    async addToFavorites(id: bigint, userId: bigint) {
        const room = await repository.findRoomById(id, userId);
        
        if (room) {
            return await repository.addRoomToFavorites(id, userId);
        }

        return null;
    }

    async deleteFromFavorites(id: bigint, userId: bigint) {
        return await repository.deleteRoomFromFavorites(id, userId);
    }

    async updateName(id: bigint, userId: bigint, name: string) {
        return await repository.updateRoomName(id, userId, name);
    }
}

export default new RoomService();