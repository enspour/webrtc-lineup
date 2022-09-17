import { User, UserAuth } from "../types"

export interface IRepository {
    findUserAuthByEmail(email: string): Promise<(UserAuth & { user: User }) | null>;

    createUser(name: string, email: string, password: string): Promise<User>;
}

export default class Repository implements IRepository {
    constructor(private _repository: IRepository) {}

    async findUserAuthByEmail(email: string): Promise<(UserAuth & { user: User; }) | null> {
        return await this._repository.findUserAuthByEmail(email); 
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        return await this._repository.createUser(name, email, password);
    }
}