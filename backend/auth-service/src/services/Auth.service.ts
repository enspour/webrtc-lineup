import { repository } from "core/database/src/connection";

class AuthService {
    async findByEmail(email: string) {
        return await repository.findUserAuthByEmail(email);
    }

    async create(name: string, email: string, password: string) {
        return await repository.createUser(name, email, password);
    }
}

export default new AuthService();