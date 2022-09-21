import { User, UserAuth, Room, Tag } from "../types"

export interface IRepository {
    findUserAuthByEmail(email: string): Promise<(UserAuth & { user: User }) | null>;

    createUser(name: string, email: string, password: string): Promise<User & { email: string }>;
    createRoom(name: string, password: string, owner_id: bigint, tags: string[]): Promise<(Room & { tags: Tag[]})>;
    deleteRoom(id: bigint): Promise<(Room & { tags: Tag[] }) | null>;
}

export default class Repository implements IRepository {
    constructor(private _repository: IRepository) {}

    async findUserAuthByEmail(email: string): Promise<(UserAuth & { user: User; }) | null> {
        return await this._repository.findUserAuthByEmail(email); 
    }

    async createUser(name: string, email: string, password: string): Promise<User & { email: string }> {
        return await this._repository.createUser(name, email, password);
    }

    async createRoom(name: string, password: string, owner_id: bigint, tags: string[]): Promise<(Room & { tags: Tag[]})> {
        return await this._repository.createRoom(name, password, owner_id, tags);
    }

    async deleteRoom(id: bigint): Promise<(Room & { tags: Tag[] }) | null> {
        return await this._repository.deleteRoom(id);
    }
}