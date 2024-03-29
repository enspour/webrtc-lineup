import _, { includes } from "lodash";

import { PrismaClient } from "@prisma/client";

import { IRepository } from "./Repository";

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

import UnknownError from "../errors/UnknownError";

export default class PrismaRepository implements IRepository {
    constructor(private prismaClient: PrismaClient) {}

    async findUserById(
        id: bigint
    ): Promise<User | null> {
        return await this.prismaClient.user.findUnique({
            where: { id }
        });
    }

    async findUserWithEmailById(
        id: bigint
    ): Promise<(User & { email: string }) | null> {
        const user = await this.prismaClient.user.findUnique({
            where: { id },
            include: { 
                auth: {
                    select: {
                        email: true
                    }
                } 
            },
        });

        if (user && user.auth) {
            return { ...user, email: user.auth.email };
        }

        return null;
    }

    async findUserAuthByEmail(
        email: string
    ): Promise<UserAuth | null> {
        return await this.prismaClient.userAuth.findUnique({
            where: { email }
        }); 
    }

    async findUserAuthByEmailWithUser(
        email: string
    ): Promise<(UserAuth & { user: User }) | null> {
        return await this.prismaClient.userAuth.findUnique({
            where: { email },
            include: { user: true }
        })
    }

    async findUserRooms(
        user_id: bigint
    ): Promise<(Room & { tags: Tag[] })[]> {
        return await this.prismaClient.room.findMany({
            where: { owner_id: user_id },
            include: { tags: true }
        });
    }

    async findFavoritesRooms(
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this.prismaClient.room.findMany({
            where: { 
                subs: {
                    some: {
                        id: user_id
                    }
                } 
            },
            include: { subs: true, tags: true, owner: true },
        }) 
    }

    async findRoomById(
        id: string, 
        user_id: bigint
    ): Promise<(Room & { owner: User, settings: RoomSettings }) | null> {
        const room = await this.prismaClient.room.findFirst({
            where: { 
                id,
                OR: [
                    { owner_id: user_id },
                    {
                        settings: {
                            visibility: true
                        }
                    },
                    {
                        subs: {
                            some: {
                                id: user_id
                            }
                        }
                    }
                ]
            },
            include: { owner: true, settings: true },
        });

        if (room && room.settings) {
            return {
                ...room,
                settings: room.settings,
            }
        }

        return null;
    }

    async findRoomByIdWithAuth(
        id: string, 
        user_id: bigint
    ): Promise<(Room & { auth: RoomAuth, settings: RoomSettings, owner: User }) | null> {
        const room = await this.prismaClient.room.findFirst({
            where: { 
                id,
                OR: [
                    { owner_id: user_id },
                    {
                        settings: {
                            visibility: true
                        }
                    },
                    {
                        subs: {
                            some: {
                                id: user_id
                            }
                        }
                    }
                ]
            },
            include: { auth: true, owner: true, settings: true }
        });

        if (room && room.auth && room.settings) {
            return {
                ...room,
                settings: room.settings,
                auth: room.auth
            }
        }

        return null;
    }

    async findRoomsByWords(
        words: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this.prismaClient.room.findMany({
            where: { 
                AND: [
                    ...(words.map(item => ({
                        name: {
                            contains: item,
                            mode: "insensitive"
                        }
                    })) as []),
                    {
                        OR: [
                            { owner_id: user_id },
                            {
                                settings: {
                                    visibility: true
                                }
                            },
                            {
                                subs: {
                                    some: {
                                        id: user_id
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            include: { tags: true, owner: true }
        })
    }

    async findRoomsByWordsTags(
        words: string[], 
        tags: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        const chunkedTags = _.chunk(tags, 1);

        return await this.prismaClient.room.findMany({
            where: {  
                AND: [
                    ...(words.map(item => ({
                        name: {
                            contains: item,
                            mode: "insensitive"
                        }
                    })) as []),

                    ...chunkedTags.map(item => ({
                        tags: {
                            some: {
                                name: { in: item }
                            }
                        }
                    })),
                    {
                        OR: [
                            { owner_id: user_id },
                            {
                                settings: {
                                    visibility: true
                                }
                            },
                            {
                                subs: {
                                    some: {
                                        id: user_id
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            include: { tags: true, owner: true }
        });
    }

    async findRoomsByTags(
        tags: string[], 
        user_id: bigint
    ): Promise<(Room & { tags: Tag[], owner: User })[]> {
        const chunkedTags = _.chunk(tags, 1);

        return await this.prismaClient.room.findMany({
            where: { 
                AND: [
                    ...chunkedTags.map(item => ({
                        tags: {
                            some: {
                                name: { in: item }
                            }
                        }
                    })),
                    {
                        OR: [
                            { owner_id: user_id },
                            {
                                settings: {
                                    visibility: true
                                }
                            },
                            {
                                subs: {
                                    some: {
                                        id: user_id
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            include: { tags: true, owner: true }
        });
    }

    async findConferences(
        room_id: string, 
        user_id: bigint
    ): Promise<(Conference & { settings: ConferenceSettings | null })[]> {
        return await this.prismaClient.conference.findMany({
            where: {
                room: {
                    id: room_id,
                    
                    OR: [
                        { owner_id: user_id },
                        {
                            settings: {
                                visibility: true
                            }
                        },
                        {
                            subs: {
                                some: {
                                    id: user_id
                                }
                            }
                        }
                    ]
                }
            },
            include: { settings: true }
        })
    }

    async createUser(
        name: string, 
        email: string, 
        password: string
    ): Promise<User & { email: string }> {
        const user = await this.prismaClient.user.create({
            data: {
                name,
                auth: {
                    create: { email, password }
                }
            },
            include: { auth: true }
        });

        if (user.auth) {
            const clone = {
                id: user.id,
                name: user.name,
                created_at: user.created_at,
                modified_at: user.modified_at,
                email: user.auth.email
            }; 

            return clone;
        }
        
        throw new UnknownError("Error creating user");
    }

    async createRoom(
        id: string, 
        name: string, 
        password: string, 
        user_id: bigint, 
        tags: string[]
    ): Promise<(Room & { tags: Tag[]})> {
        return await this.prismaClient.room.create({
            data: {
                id,
                name,
                owner_id: user_id,

                auth: {
                    create: {
                        password
                    }
                },

                settings: {
                    create: {
                        visibility: true
                    }
                },
                
                tags: {
                    connectOrCreate: tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag }
                    }))
                }
            },
            
            include: { tags: true }
        });
    }

    async createConference(
        id: string,
        name: string, 
        description: string,
        room_id: string,
        user_id: bigint
    ): Promise<Conference | null> {
        return await this.prismaClient.$transaction(async (tx) => {
            const room = await tx.room.findUnique({
                where: { id: room_id }
            });

            if (room && room.owner_id === user_id) {
                return await tx.conference.create({
                    data: {
                        id,
                        name,
                        description,
                        room: {
                            connect: {
                                id: room_id
                            }
                        },
                        settings: {
                            create: {
                                enable_audio: true,
                                enable_video: true
                            }
                        }
                    }
                });
            }
            
            return null;
        })
    }

    async deleteRoom(
        id: string, 
        user_id: bigint
    ): Promise<number> {
        const result = await this.prismaClient.room.deleteMany({
            where: {
                id,
                owner_id: user_id
            }
        });

        return result.count;
    }

    async deleteConference(
        id: string, 
        user_id: bigint
    ): Promise<number> {
        const result = await this.prismaClient.conference.deleteMany({
            where: {
                id,
                room: { owner_id: user_id }
            }
        });

        return result.count;
    }

    async deleteRoomFromFavorites(
        id: string, 
        user_id: bigint
    ): Promise<Room> {
        return await this.prismaClient.room.update({
            where: { id },
            data: {
                subs: {
                    disconnect: { id: user_id }
                } 
            }
        });
    }

    async addRoomToFavorites(
        id: string, 
        user_id: bigint
    ): Promise<Room> {
        return await this.prismaClient.room.update({
            where: {
                id,
            },
            data: {
                subs: {
                    connect: { id: user_id }
                }
            }
        })
    }

    async updateRoomName(
        id: string, 
        user_id: bigint, 
        name: string
    ): Promise<number> {
        const result = await this.prismaClient.room.updateMany({
            where: {
                id,
                owner_id: user_id
            },
            data: {
                name
            },
        });

        return result.count
    }

    async updateRoomSettingsVisibility(
        id: string, 
        user_id: bigint, 
        visibility: boolean
    ): Promise<number> {
        const result = await this.prismaClient.roomSettings.updateMany({
            where: {
                room: {
                    id,
                    owner_id: user_id
                }
            },
            data: {
                visibility
            },
        });

        return result.count
    }

    async updateConferenceName(
        id: string, 
        user_id: bigint, 
        name: string
    ): Promise<number> {
        const result = await this.prismaClient.conference.updateMany({
            where: {
                id,
                room: { owner_id: user_id }
            },
            data: {
                name
            }
        });

        return result.count;
    }

    async updateConferenceDescription(
        id: string, 
        user_id: bigint, 
        description: string
    ): Promise<number> {
        const result = await this.prismaClient.conference.updateMany({
            where: {
                id,
                room: { owner_id: user_id }
            },
            data: {
                description
            }
        });

        return result.count;
    }

    async updateConferenceSettingsEnableAudio(
        id: string, 
        user_id: bigint, 
        enable_audio: boolean
    ): Promise<number> {
        const result = await this.prismaClient.conferenceSettings.updateMany({
            where: {
                conference: {
                    id,
                    room: { owner_id: user_id }
                }
            },
            data: {
                enable_audio
            },
        });

        return result.count
    }

    async updateConferenceSettingsEnableVideo(
        id: string, 
        user_id: bigint, 
        enable_video: boolean
    ): Promise<number> {
        const result = await this.prismaClient.conferenceSettings.updateMany({
            where: {
                conference: {
                    id,
                    room: { owner_id: user_id }
                }
            },
            data: {
                enable_video
            },
        });

        return result.count
    }


    async findRoomByIdPrivilege(
        id: string
    ): Promise<(Room & { owner: User, settings: RoomSettings }) | null> {
        const room = await this.prismaClient.room.findFirst({
            where: { id },
            include: { owner: true, settings: true },
        });

        if (room && room.settings) {
            return {
                ...room,
                settings: room.settings,
            }
        }

        return null;
    }

    async findConferenceByIdPrivilege(
        id: string
    ): Promise<(Conference & { settings: ConferenceSettings }) | null> {
        const conference = await this.prismaClient.conference.findFirst({
            where: { id },
            include: { settings: true }
        })

        if (conference && conference.settings) {
            return {
                ...conference,
                settings: conference.settings
            }
        }

        return null;
    }
}