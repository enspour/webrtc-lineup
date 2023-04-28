import { PrismaClient }  from "@prisma/client";

import PrismaRepository from "./repositories/PrismaRepository";
import Repository from "./repositories/Repository";

let repository: Repository;

const connect = async () => {
    const prisma = new PrismaClient();

    await prisma.$connect();

    const prismaRepository = new PrismaRepository(prisma);
    repository = new Repository(prismaRepository);
}

export {
    connect,
    repository
};