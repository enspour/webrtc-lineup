import { repository } from "core/database/src/connection";

class RoomService {
    async getRoom(id: bigint) {
        return await repository.findRoomByIdWithSettings(id);
    }

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
}

export default new RoomService();