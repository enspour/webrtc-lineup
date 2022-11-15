import jwt from "jsonwebtoken";
import fetch from "node-fetch";

export interface JWTAccessPayload {
    user: {
        id: string,
        name: string,
        email: string
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

export const loadPublicKeyAccessToken = async (backend: string) => {
    const response = await fetch(`${backend}/services-communication/auth-service/auth/access-token/public-key`);

    if (response.status === 200) {
        const data = await response.json();
        return data.body.key;
    }
    
    throw new Error("Error loading public key of access token");
}