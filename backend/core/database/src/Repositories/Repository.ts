import { User, UserAuth, Room, RoomAuth, RoomSettings, Tag } from "../types"

export interface IRepository {
    findUserAuthByEmailWithUser(email: string): Promise<(UserAuth & { user: User }) | null>;
    findUserAuthByEmail(email: string): Promise<UserAuth | null>;
    findUserRooms(user_id: bigint): Promise<(Room & { tags: Tag[] })[]>;
    findFavoritesRooms(user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]>;
    findRoomById(id: bigint, user_id: bigint): Promise<(Room & { owner: User, settings: RoomSettings }) | null>;
    findRoomByIdWithAuth(id: bigint, user_id: bigint): Promise<(Room & { auth: RoomAuth, settings: RoomSettings, owner: User }) | null>;
    findRoomsByWords(words: string[], user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]>;
    findRoomsByWordsTags(words: string[], tags: string[], user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]>;
    findRoomsByTags(tags: string[], user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]>;

    createUser(name: string, email: string, password: string): Promise<User & { email: string }>;
    createRoom(name: string, password: string, user_id: bigint, tags: string[]): Promise<(Room & { tags: Tag[]})>;
    
    deleteRoom(id: bigint, user_id: bigint): Promise<number>;
    deleteRoomFromFavorites(room_id: bigint, user_id: bigint): Promise<Room>;

    addRoomToFavorites(room_id: bigint, user_id: bigint): Promise<Room>;

    updateRoomName(room_id: bigint, user_id: bigint, name: string): Promise<number>;
    updateRoomSettingsVisibility(room_id: bigint, user_id: bigint, visibility: boolean): Promise<number>;
    updateRoomSettingsEnableAudio(room_id: bigint, user_id: bigint, enable_audio: boolean): Promise<number>;
    updateRoomSettingsEnableVideo(room_id: bigint, user_id: bigint, enable_video: boolean): Promise<number>;


    findRoomByIdPrivilege(id: bigint): Promise<(Room & { owner: User, settings: RoomSettings }) | null>;
}

export default class Repository implements IRepository {
    constructor(private _repository: IRepository) {}

    async findUserAuthByEmailWithUser(email: string): Promise<(UserAuth & { user: User; }) | null> {
        return await this._repository.findUserAuthByEmailWithUser(email); 
    }

    async findUserAuthByEmail(email: string): Promise<UserAuth | null> {
        return await this._repository.findUserAuthByEmail(email);
    }

    async findUserRooms(user_id: bigint): Promise<(Room & { tags: Tag[] })[]> {
        return await this._repository.findUserRooms(user_id);
    }

    async findFavoritesRooms(user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findFavoritesRooms(user_id);
    }

    async findRoomById(id: bigint, user_id: bigint): Promise<(Room & { owner: User, settings: RoomSettings }) | null> {
        return await this._repository.findRoomById(id, user_id);
    }

    async findRoomByIdWithAuth(id: bigint, user_id: bigint): Promise<(Room & { auth: RoomAuth, settings: RoomSettings, owner: User }) | null> {
        return await this._repository.findRoomByIdWithAuth(id, user_id);
    }

    async findRoomsByWords(words: string[], user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findRoomsByWords(words, user_id);
    }

    async findRoomsByWordsTags(words: string[], tags: string[], user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findRoomsByWordsTags(words, tags, user_id);
    }

    async findRoomsByTags(tags: string[], user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findRoomsByTags(tags, user_id);
    }

    async createUser(name: string, email: string, password: string): Promise<User & { email: string }> {
        return await this._repository.createUser(name, email, password);
    }

    async createRoom(name: string, password: string, user_id: bigint, tags: string[]): Promise<(Room & { tags: Tag[]})> {
        return await this._repository.createRoom(name, password, user_id, tags);
    }

    async deleteRoom(id: bigint, user_id: bigint): Promise<number> {
        return await this._repository.deleteRoom(id, user_id);
    }

    async deleteRoomFromFavorites(room_id: bigint, user_id: bigint): Promise<Room>  {
        return await this._repository.deleteRoomFromFavorites(room_id, user_id);
    }

    async addRoomToFavorites(room_id: bigint, user_id: bigint): Promise<Room> {
        return await this._repository.addRoomToFavorites(room_id, user_id);
    }

    async updateRoomName(room_id: bigint, user_id: bigint, name: string): Promise<number> {
        return await this._repository.updateRoomName(room_id, user_id, name);
    }

    async updateRoomSettingsVisibility(room_id: bigint, user_id: bigint, visibility: boolean): Promise<number> {
        return await this._repository.updateRoomSettingsVisibility(room_id, user_id, visibility);
    }

    async updateRoomSettingsEnableAudio(room_id: bigint, user_id: bigint, enable_audio: boolean): Promise<number> {
        return await this._repository.updateRoomSettingsEnableAudio(room_id, user_id, enable_audio);
    }
    async updateRoomSettingsEnableVideo(room_id: bigint, user_id: bigint, enable_audio: boolean): Promise<number> {
        return await this._repository.updateRoomSettingsEnableVideo(room_id, user_id, enable_audio);
    }


    async findRoomByIdPrivilege(id: bigint): Promise<(Room & { owner: User, settings: RoomSettings }) | null> {
        return this._repository.findRoomByIdPrivilege(id);
    }
}