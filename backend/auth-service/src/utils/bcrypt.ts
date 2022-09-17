import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

export const validatePassowrd = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
}