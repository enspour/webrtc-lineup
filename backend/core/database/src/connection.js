const { PrismaClient } = require("@prisma/client");

module.exports.connect = async () => {
    const prisma = new PrismaClient();

    await prisma.$connect();

    return prisma;
}