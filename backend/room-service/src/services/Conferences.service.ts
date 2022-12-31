import { repository } from "core/database/src/connection";

class ConferencesService {
    async findAll(roomId: bigint, userId: bigint) {
        return await repository.findConferences(roomId, userId);
    }
}

export default new ConferencesService();