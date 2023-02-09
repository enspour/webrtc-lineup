import { repository } from "core/postgresql/connection";

class ConferencesService {
    async findAll(roomId: bigint, userId: bigint) {
        return await repository.findConferences(roomId, userId);
    }
}

export default new ConferencesService();