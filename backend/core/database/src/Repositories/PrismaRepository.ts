import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { IRepository } from "./Repository";

import { User, UserAuth, Room, Tag } from "../types"

import DuplicateError from "../QueryError/DuplicateError";
import UnknowError from "../QueryError/UnknowError";

export default class PrismaRepository implements IRepository {
    constructor(private prismaClient: PrismaClient) {}


    async findUserAuthByEmail(email: string): Promise<(UserAuth & { user: User }) | null> {
        return await this.prismaClient.userAuth.findUnique({
            where: { email },
            include: { user: true }
        })
    }

    async createUser(name: string, email: string, password: string): Promise<User & { email: string }> {
        const foundedUser = await this.prismaClient.userAuth.findUnique({
            where: { email }
        });

        if (foundedUser) {
            throw new DuplicateError("User with email is exists", "email");
        }
        
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
        const room = await this.prismaClient.room.create({
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
            
            include: { settings: true, tags: true }
        });

        if (room.settings) {
            const clone = { 
                id: room.id,
                name: room.name,
                status: room.status,
                owner_id: room.owner_id,
                tags: room.tags,
                created_at: room.created_at,
            }

            return clone;
        }

        throw new UnknowError("Error creating room");
    } 

    async deleteRoom(id: bigint): Promise<(Room & { tags: Tag[] }) | null> {
        try {
            return await this.prismaClient.room.delete({
                where: { id },
                include: { tags: true }
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
}