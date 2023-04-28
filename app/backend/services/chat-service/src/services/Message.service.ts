import { repository } from "cassandra/src/connection";
import { User } from "cassandra/src/types";

class MessageService {
    async create(conferenceId: string, text: string, owner: User) {
        return await repository.createMessage(conferenceId, text, owner);
    }
}

export default new MessageService();