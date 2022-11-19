import { repository } from "core/database/src/connection";

class ConferenceService {
    async findOneByIdPrivilege(id: string) {
        return await repository.findConferenceByIdPrivilege(id);
    }
}

export default new ConferenceService();