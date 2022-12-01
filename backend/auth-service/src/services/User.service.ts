import { repository } from "core/database/src/connection";

class UserService {
    async findById(id: bigint) {
        return await repository.findUserById(id);
    }

    async findByEmail(email: string) {
        return await repository.findUserAuthByEmailWithUser(email);
    }

    async create(name: string, email: string, password: string) {
        const user = await repository.findUserAuthByEmail(email);

        if (user) {
            return null;
        }
        
        return await repository.createUser(name, email, password);
    }
}

export default new UserService();