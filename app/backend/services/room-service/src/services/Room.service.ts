import { nanoid } from "nanoid";

import { repository } from "postgresql/src/connection";

class RoomService {
    async findByIdPrivilege(id: string) {
        return await repository.findRoomByIdPrivilege(id);
    }

    async findById(id: string, userId: bigint) {
        return await repository.findRoomById(id, userId);
    }

    async findByIdWithAuth(roomId: string, userId: bigint) {
        return await repository.findRoomByIdWithAuth(roomId, userId);
    }

    async create(name: string, password: string, userId: bigint, tags: string[]) {
        const id = nanoid();
        return await repository.createRoom(id, name, password, userId, tags);
    }

    async delete(id: string, userId: bigint) {
        return await repository.deleteRoom(id, userId);
    }

    async addToFavorites(id: string, userId: bigint) {
        const room = await repository.findRoomById(id, userId);
        
        if (room) {
            return await repository.addRoomToFavorites(id, userId);
        }

        return null;
    }

    async deleteFromFavorites(id: string, userId: bigint) {
        return await repository.deleteRoomFromFavorites(id, userId);
    }

    async updateName(id: string, userId: bigint, name: string) {
        return await repository.updateRoomName(id, userId, name);
    }

    async updateVisibility(id: string, userId: bigint, visibility: boolean) {
        return await repository.updateRoomSettingsVisibility(id, userId, visibility);
    }
}

export default new RoomService();