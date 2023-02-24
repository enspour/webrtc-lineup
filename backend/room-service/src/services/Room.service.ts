import { repository } from "core/postgresql/src/connection";

class RoomService {
    async findByIdPrivilege(id: bigint) {
        return await repository.findRoomByIdPrivilege(id);
    }

    async findById(id: bigint, userId: bigint) {
        return await repository.findRoomById(id, userId);
    }

    async findByIdWithAuth(roomId: bigint, userId: bigint) {
        return await repository.findRoomByIdWithAuth(roomId, userId);
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

    async updateVisibility(roomId: bigint, userId: bigint, visibility: boolean) {
        return await repository.updateRoomSettingsVisibility(roomId, userId, visibility);
    }
}

export default new RoomService();