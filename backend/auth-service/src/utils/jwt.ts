import jwt from "jsonwebtoken";

import JWTConfig from "@configs/jwt.config";
import JWTKeys from "@loaders/jwt.keys";

export interface JWTAccessOptions {
    user: {
        id: string,
        name: string,
        email: string
    }
}

export interface JWTRefreshOptions extends JWTAccessOptions {
    jti: string
}

export interface JWTAccessPayload {
    user: {
        id: string,
        name: string,
        email: string
    },
    iat: number,
}

export interface JWTRefreshPayload extends JWTAccessPayload {
    jti: string  
}

export const issueAccessJWT = (options: JWTAccessOptions) => {
    const { user } = options;
    
    const payload: JWTAccessPayload = {
        user,
        iat: Math.floor(Date.now() / 1000),
    }
    
    const expiresIn = JWTConfig.accessToken.expiresIn;
    const privateKey = JWTKeys.accessTokenKeys.privateKey;

    return jwt.sign(payload, privateKey, {
        expiresIn,
        algorithm: "RS256"
    });
}

export const verifyAccessJWT = (token: string) => {
    const publicKey = JWTKeys.accessTokenKeys.publicKey;

    try {
        jwt.verify(token, publicKey, { algorithms: ["RS256"] });
        return true;
    } catch {
        return false;
    }
}

export const decodeAccessJWT = (token: string) => {
    return jwt.decode(token) as JWTAccessPayload;
}

export const issueRefreshJWT = (options: JWTRefreshOptions) => {
    const { user, jti } = options;

    const payload: JWTRefreshPayload = {
        user,
        jti,
        iat: Math.floor(Date.now() / 1000)
    };

    const expiresIn = JWTConfig.refreshToken.expiresIn;
    const privateKey = JWTKeys.refreshTokenKeys.privateKey;

    return jwt.sign(payload, privateKey, {
        expiresIn,
        algorithm: "RS256"
    });
}

export const verifyRefreshJWT = (token: string) => {
    const publicKey = JWTKeys.refreshTokenKeys.publicKey;

    try {
        jwt.verify(token, publicKey, { algorithms: ["RS256"] });
        return true;
    } catch {
        return false;
    }
}

export const decodeRefreshJWT = (token: string) => {
    return jwt.decode(token) as JWTRefreshPayload;
}