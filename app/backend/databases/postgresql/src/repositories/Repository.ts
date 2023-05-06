import { 
    User, 
    UserAuth, 
    Room, 
    RoomAuth, 
    RoomSettings, 
    Conference, 
    ConferenceSettings,
    Tag 
} from "../types";

export interface IRepository {
    findUserById(
        id: bigint
    ): Promise<User | null>;
    
    findUserAuthByEmail(
        email: string
    ): Promise<UserAuth | null>;
    
    findUserAuthByEmailWithUser(
        email: string
    ): Promise<(UserAuth & { user: User }) | null>;
    
    findUserRooms(
        user_id: bigint
    ): Promise<(Room & { tags: Tag[] })[]>;
    
    findFavoritesRooms(
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]>;

    findRoomById(
        id: string, 
        user_id: bigint
    ): Promise<(Room & { owner: User, settings: RoomSettings }) | null>;

    findRoomByIdWithAuth(
        id: string, 
        user_id: bigint
    ): Promise<(Room & { auth: RoomAuth, settings: RoomSettings, owner: User }) | null>;
    
    findRoomsByWords(
        words: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]>;
    
    findRoomsByWordsTags(
        words: string[], 
        tags: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]>;
    
    findRoomsByTags(
        tags: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]>;

    findConferences(
        room_id: string, 
        user_id: bigint
    ): Promise<(Conference & { settings: ConferenceSettings | null })[]>;

    
    createUser(
        name: string, 
        email: string, 
        password: string
    ): Promise<User & { email: string }>;
    
    createRoom(
        id: string,
        name: string, 
        password: string, 
        user_id: bigint, 
        tags: string[]
    ): Promise<(Room & { tags: Tag[]})>;

    createConference(
        id: string,
        name: string, 
        description: string,
        room_id: string,
        user_id: bigint
    ): Promise<Conference | null>;
    

    deleteRoom(
        id: string, 
        user_id: bigint
    ): Promise<number>;
    
    deleteConference(
        id: string, 
        user_id: bigint
    ): Promise<number>;

    deleteRoomFromFavorites(
        id: string, 
        user_id: bigint
    ): Promise<Room>;


    addRoomToFavorites(
        id: string,
        user_id: bigint
    ): Promise<Room>;


    updateRoomName(
        id: string, 
        user_id: bigint, 
        name: string
    ): Promise<number>;

    updateRoomSettingsVisibility(
        id: string, 
        user_id: bigint, 
        visibility: boolean
    ): Promise<number>;
    
    updateConferenceName(
        id: string, 
        user_id: bigint, 
        name: string
    ): Promise<number>;

    updateConferenceDescription(
        id: string, 
        user_id: bigint, 
        description: string
    ): Promise<number>;

    updateConferenceSettingsEnableAudio(
        id: string, 
        user_id: bigint, 
        enable_audio: boolean
    ): Promise<number>;
    
    updateConferenceSettingsEnableVideo(
        id: string, 
        user_id: bigint, 
        enable_video: boolean
    ): Promise<number>;


    findRoomByIdPrivilege(
        id: string
    ): Promise<(Room & { owner: User, settings: RoomSettings }) | null>;

    findConferenceByIdPrivilege(
        id: string
    ): Promise<(Conference & { settings: ConferenceSettings }) | null>;
}

export default class Repository implements IRepository {
    constructor(private _repository: IRepository) {}

    async findUserById(
        id: bigint
    ): Promise<User | null> {
        return await this._repository.findUserById(id);
    }

    async findUserAuthByEmail(
        email: string
    ): Promise<UserAuth | null> {
        return await this._repository.findUserAuthByEmail(email);
    }

    async findUserAuthByEmailWithUser(
        email: string
    ): Promise<(UserAuth & { user: User; }) | null> {
        return await this._repository.findUserAuthByEmailWithUser(email); 
    }

    async findUserRooms(
        user_id: bigint
    ): Promise<(Room & { tags: Tag[] })[]> {
        return await this._repository.findUserRooms(user_id);
    }

    async findFavoritesRooms(
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findFavoritesRooms(user_id);
    }

    async findRoomById(
        id: string, 
        user_id: bigint
    ): Promise<(Room & { owner: User, settings: RoomSettings }) | null> {
        return await this._repository.findRoomById(id, user_id);
    }

    async findRoomByIdWithAuth(
        id: string, 
        user_id: bigint
    ): Promise<(Room & { auth: RoomAuth, settings: RoomSettings, owner: User }) | null> {
        return await this._repository.findRoomByIdWithAuth(id, user_id);
    }

    async findRoomsByWords(
        words: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findRoomsByWords(words, user_id);
    }

    async findRoomsByWordsTags(
        words: string[], 
        tags: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findRoomsByWordsTags(words, tags, user_id);
    }

    async findRoomsByTags(
        tags: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this._repository.findRoomsByTags(tags, user_id);
    }

    async findConferences(
        room_id: string, 
        user_id: bigint
    ): Promise<(Conference & { settings: ConferenceSettings | null })[]> {
        return await this._repository.findConferences(room_id, user_id);
    }

    async createUser(
        name: string, 
        email: string, 
        password: string
    ): Promise<User & { email: string }> {
        return await this._repository.createUser(name, email, password);
    }

    async createRoom(
        id: string, 
        name: string, 
        password: string, 
        user_id: bigint, 
        tags: string[]
    ): Promise<(Room & { tags: Tag[]})> {
        return await this._repository.createRoom(id, name, password, user_id, tags);
    }

    async createConference(
        id: string,
        name: string, 
        description: string,
        room_id: string,
        user_id: bigint
    ): Promise<Conference | null> {
        return this._repository.createConference(id, name, description, room_id, user_id);
    }

    async deleteRoom(
        id: string,
        user_id: bigint
    ): Promise<number> {
        return await this._repository.deleteRoom(id, user_id);
    }

    async deleteConference(
        id: string, 
        user_id: bigint
    ): Promise<number> {
        return await this._repository.deleteConference(id, user_id);
    }

    async deleteRoomFromFavorites(
        id: string, 
        user_id: bigint
    ): Promise<Room> {
        return await this._repository.deleteRoomFromFavorites(id, user_id);
    }

    async addRoomToFavorites(
        id: string, 
        user_id: bigint
    ): Promise<Room> {
        return await this._repository.addRoomToFavorites(id, user_id);
    }

    async updateRoomName(
        id: string, 
        user_id: bigint,
        name: string
    ): Promise<number> {
        return await this._repository.updateRoomName(id, user_id, name);
    }

    async updateRoomSettingsVisibility(
        id: string, 
        user_id: bigint, 
        visibility: boolean
    ): Promise<number> {
        return await this._repository.updateRoomSettingsVisibility(id, user_id, visibility);
    }

    updateConferenceName(
        id: string, 
        user_id: bigint, 
        name: string
    ): Promise<number> {
        return this._repository.updateConferenceName(
            id,
            user_id,
            name
        );
    }

    updateConferenceDescription(
        id: string, 
        user_id: bigint, 
        description: string
    ): Promise<number> {
        return this._repository.updateConferenceDescription(
            id,
            user_id,
            description
        );
    }

    async updateConferenceSettingsEnableAudio(
        id: string, 
        user_id: bigint, 
        enable_audio: boolean
    ): Promise<number> {
        return await this._repository.updateConferenceSettingsEnableAudio(
            id, 
            user_id, 
            enable_audio
        );
    }

    async updateConferenceSettingsEnableVideo(
        id: string, 
        user_id: bigint, 
        enable_video: boolean
    ): Promise<number> {
        return await this._repository.updateConferenceSettingsEnableVideo(
            id, 
            user_id,
            enable_video
        );
    }


    async findRoomByIdPrivilege(
        id: string
    ): Promise<(Room & { owner: User, settings: RoomSettings }) | null> {
        return this._repository.findRoomByIdPrivilege(id);
    }

    async findConferenceByIdPrivilege(
        id: string
    ): Promise<(Conference & { settings: ConferenceSettings }) | null> {
        return this._repository.findConferenceByIdPrivilege(id);
    }
}