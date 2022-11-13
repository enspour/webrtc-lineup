import { repository } from "core/database/src/connection";

class RoomsService {
    async getCreated(userId: bigint) {
        return await repository.findUserRooms(userId);
    }

    async getFavorites(userId: bigint) {
        return await repository.findFavoritesRooms(userId);
    }

    async search(words: string[], tags: string[]) {
        if (words.length) {
            if (tags.length) {
                return await repository.findRoomsByWordsTags(words, tags);
            } else {
                return await repository.findRoomsByWords(words);
            }
        }

        if (tags.length) {
            return await repository.findRoomsByTags(tags);
        }

        return [];
    }
}

export default new RoomsService();