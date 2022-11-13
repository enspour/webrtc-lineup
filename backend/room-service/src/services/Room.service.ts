import { repository } from "core/database/src/connection";

class RoomService {
    async getRoom(id: bigint) {
        return await repository.findRoomByIdWithSettings(id);
    }

    async create(name: string, password: string, ownerId: bigint, tags: string[]) {
        return await repository.createRoom(name, password, ownerId, tags);
    }

    async delete(id: bigint, userId: bigint) {
        return await repository.deleteRoom(id, userId);
    }

    async addToFavorites(id: bigint, userId: bigint) {
        const room = await repository.findRoomById(id);

        if (room) {
            await repository.addRoomToFavorites(id, userId);
            return room;
        }

        return null
    }

    async deleteFromFavorites(id: bigint, userId: bigint) {
        const room = await repository.findRoomById(id);

        if (room) {
            await repository.deleteRoomFromFavorites(id, userId);
            return room;
        }

        return null;
    }

    async updateName(id: bigint, userId: bigint, name: string) {
        return await repository.updateRoomName(id, userId, name);
    }
}

export default new RoomService();