import { repository } from "core/database/src/connection";

class RoomsService {
    async getCreated(userId: bigint) {
        return await repository.findUserRooms(userId);
    }

    async getFavorites(userId: bigint) {
        return await repository.findFavoritesRooms(userId);
    }

    async search(userId: bigint, words: string[], tags: string[]) {
        if (words.length) {
            if (tags.length) {
                return await repository.findRoomsByWordsTags(words, tags, userId);
            } else {
                return await repository.findRoomsByWords(words, userId);
            }
        }

        if (tags.length) {
            return await repository.findRoomsByTags(tags, userId);
        }

        return [];
    }
}

export default new RoomsService();