import { PrismaClient, User, UserAuth } from "@prisma/client";

import { IRepository } from "./Repository";

import DuplicateError from "../QueryError/DuplicateError";

export default class PrismaRepository implements IRepository {
    constructor(private prismaClient: PrismaClient) {}


    async findUserAuthByEmail(email: string): Promise<(UserAuth & { user: User }) | null> {
        return await this.prismaClient.userAuth.findUnique({
            where: { email },
            include: { user: true }
        })
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
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

        return user;
    }
}