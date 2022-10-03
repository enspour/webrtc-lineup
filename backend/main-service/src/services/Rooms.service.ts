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

    async getCreated(userId: bigint) {
        return await repository.findUserRooms(userId);
    }

    async getFavorites(userId: bigint) {
        return await repository.findFavoritesRooms(userId);
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

    async search(name: string, tags: string[]) {
        if (name) {
            if (tags.length === 0) {
                return await repository.findRoomsByName(name);
            } else {
                return await repository.findRoomsByNameTags(name, tags);
            }
        }

        if (tags.length !== 0) {
            return await repository.findRoomsByTags(tags);
        }

        return [];
    }
}

export default new RoomsService();