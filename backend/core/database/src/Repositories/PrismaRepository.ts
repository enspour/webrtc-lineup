import _ from "lodash";

import { PrismaClient, RoomSettings } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { IRepository } from "./Repository";

import { User, UserAuth, Room, RoomAuth, Tag } from "../types"

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

    async findRoomById(id: bigint): Promise<Room | null> {
        return await this.prismaClient.room.findFirst({
            where: { id }
        });
    }

    async findRoomAuthById(id: bigint): Promise<(Room & { auth: RoomAuth }) | null> {
        const room = await this.prismaClient.room.findUnique({
            where: { id },
            include: { auth: true }
        });

        if (room && room.auth) {
            return {
                ...room,
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
                    create: {}
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

    async deleteRoom(id: bigint): Promise<Room | null> {
        try {
            return await this.prismaClient.room.delete({
                where: { id }
            });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    return null;
                }
            }

            throw err;
        }
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
}