import { repository } from "cassandra/src/connection";

class MessagesService {
    async findAll(conferenceId: string) {
        return await repository.findMessages(conferenceId);
    }
}

export default new MessagesService();