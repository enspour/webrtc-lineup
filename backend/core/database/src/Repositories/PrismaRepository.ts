import { PrismaClient, User, UserAuth } from "@prisma/client";

import { IRepository } from "./Repository";

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
}