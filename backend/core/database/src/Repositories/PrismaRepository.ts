import _, { includes } from "lodash";

import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { IRepository } from "./Repository";

import { User, UserAuth, Room, RoomAuth, RoomSettings, Tag } from "../types"

import UnknowError from "../QueryError/UnknowError";

export default class PrismaRepository implements IRepository {
    constructor(private prismaClient: PrismaClient) {}

    async findUserAuthByEmailWithUser(email: string): Promise<(UserAuth & { user: User }) | null> {
        return await this.prismaClient.userAuth.findUnique({
            where: { email },
            include: { user: true }
        })
    }

    async findUserAuthByEmail(email: string): Promise<UserAuth | null> {
        return await this.prismaClient.userAuth.findUnique({
            where: { email }
        }); 
    }

    async findUserRooms(user_id: bigint): Promise<(Room & { tags: Tag[] })[]> {
        return await this.prismaClient.room.findMany({
            where: { owner_id: user_id },
            include: { tags: true }
        });
    }

    async findFavoritesRooms(user_id: bigint): Promise<(Room & { tags: Tag[], owner: User })[]> {
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

    async findRoomById(id: bigint): Promise<(Room & { owner: User }) | null> {
        return await this.prismaClient.room.findFirst({
            where: { id },
            include: { owner: true }
        });
    }

    async findRoomByIdWithSettings(id: bigint): Promise<(Room & { settings: RoomSettings, owner: User }) | null> {
        const room = await this.prismaClient.room.findUnique({
            where: { id },
            include: { owner: true, settings: true }
        });

        if (room && room.settings) {
            return {
                ...room,
                settings: room.settings,
            }
        }

        return null;
    }

    async findRoomByIdWithAuthSettings(id: bigint): Promise<(Room & { auth: RoomAuth, settings: RoomSettings, owner: User }) | null> {
        const room = await this.prismaClient.room.findUnique({
            where: { id },
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

    async findRoomsByWords(words: string[]): Promise<(Room & { tags: Tag[], owner: User })[]> {
        return await this.prismaClient.room.findMany({
            where: { 
                AND: words.map(item => ({
                    name: {
                        contains: item,
                        mode: "insensitive"
                    }
                }))
            },
            include: { tags: true, owner: true }
        })
    }

    async findRoomsByWordsTags(words: string[], tags: string[]): Promise<(Room & { tags: Tag[], owner: User })[]> {
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
                    }))
                ]
            },
            include: { tags: true, owner: true }
        });
    }

    async findRoomsByTags(tags: string[]): Promise<(Room & { tags: Tag[], owner: User })[]> {
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
                    }))
                ]
            },
            include: { tags: true, owner: true }
        });
    }

    async createUser(name: string, email: string, password: string): Promise<User & { email: string }> {
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
        
        throw new UnknowError("Error creating user");
    }

    async createRoom(name: string, password: string, owner_id: bigint, tags: string[]): Promise<(Room & { tags: Tag[]})> {
        return await this.prismaClient.room.create({
            data: {
                name,
                owner_id,

                auth: {
                    create: {
                        password
                    }
                },

                settings: {
                    create: {
                        visibility: true,
                        enable_audio: true,
                        enable_video: true
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

    async deleteRoom(id: bigint, user_id: bigint): Promise<number> {
        const result = await this.prismaClient.room.deleteMany({
            where: {
                id,
                owner_id: user_id
            }
        });

        return result.count;
    }

    async deleteRoomFromFavorites(room_id: bigint, user_id: bigint): Promise<User> {
        return await this.prismaClient.user.update({
            where: { id: user_id },
            data: {
                fav_rooms: {
                    disconnect: { id: room_id }
                }
            }
        })
    }

    async addRoomToFavorites(room_id: bigint, user_id: bigint): Promise<User> {
        return await this.prismaClient.user.update({
            where: { id: user_id },
            data: {
                fav_rooms: {
                    connect: { id: room_id }
                }
            }
        })
    }

    async updateRoomName(room_id: bigint, user_id: bigint, name: string): Promise<number> {
        const result = await this.prismaClient.room.updateMany({
            where: {
                id: room_id,
                owner_id: user_id
            },
            data: {
                name
            },
        });

        return result.count
    }

    async updateRoomSettingsVisibility(room_id: bigint, user_id: bigint, visibility: boolean): Promise<number> {
        const result = await this.prismaClient.roomSettings.updateMany({
            where: {
                room: {
                    id: room_id,
                    owner_id: user_id
                }
            },
            data: {
                visibility
            },
        });

        return result.count
    }

    async updateRoomSettingsEnableAudio(room_id: bigint, user_id: bigint, enable_audio: boolean): Promise<number> {
        const result = await this.prismaClient.roomSettings.updateMany({
            where: {
                room: {
                    id: room_id,
                    owner_id: user_id
                }
            },
            data: {
                enable_audio
            },
        });

        return result.count
    }
    async updateRoomSettingsEnableVideo(room_id: bigint, user_id: bigint, enable_video: boolean): Promise<number> {
        const result = await this.prismaClient.roomSettings.updateMany({
            where: {
                room: {
                    id: room_id,
                    owner_id: user_id
                }
            },
            data: {
                enable_video
            },
        });

        return result.count
    }
}