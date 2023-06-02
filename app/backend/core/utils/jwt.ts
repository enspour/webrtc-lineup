import jwt from "jsonwebtoken";

export interface JWTAccessPayload {
    user: {
        id: string,
        name: string
    },
    iat: number,
}

export const decodeAccessToken = (token: string) => {
    return jwt.decode(token) as JWTAccessPayload;
}

export const verifyAccessToken = (token: string, key: string) => {
    try {
        jwt.verify(token, key, { algorithms: ["RS256"] });
        return true;
    } catch {
        return false;
    }
}