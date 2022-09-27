import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { IRepository } from "./Repository";

import { User, UserAuth, Room, Tag } from "../types"

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

    async findRoomById(id: bigint): Promise<Room | null> {
        return await this.prismaClient.room.findFirst({
            where: { id }
        });
    }

    async findUserRooms(user_id: bigint): Promise<Room[]> {
        return await this.prismaClient.room.findMany({
            where: { owner_id: user_id },
            include: { tags: true }
        });
    }

    async findFavoritesRooms(user_id: bigint): Promise<Room[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: user_id },
            include: { fav_rooms: true }
        })

        return user?.fav_rooms || [];
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

                settings: {
                    create: { password }
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