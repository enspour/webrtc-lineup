import { repository } from "@cassandra/connection";
import { User } from "@cassandra/Repository/types";

class MessageService {
    async create(conferenceId: string, text: string, owner: User) {
        return await repository.createMessage(conferenceId, text, owner);
    }
}

export default new MessageService();