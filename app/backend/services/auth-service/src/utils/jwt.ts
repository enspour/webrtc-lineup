import jwt from "jsonwebtoken";

import JWTConfig from "@configs/jwt.config";
import { accessTokenKeys, refreshTokenKeys } from "@loaders/jwt.keys";

import { 
    JWTAccessPayload, 
    verifyAccessToken, 
    decodeAccessToken 
} from "core/utils/jwt";

export {
    JWTAccessPayload
}

export interface JWTAccessOptions {
    user: {
        id: string,
        name: string,
    }
}

export interface JWTRefreshOptions extends JWTAccessOptions {
    jti: string
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
    const privateKey = accessTokenKeys.privateKey;

    return jwt.sign(payload, privateKey, {
        expiresIn,
        algorithm: "RS256"
    });
}

export const issueRefreshJWT = (options: JWTRefreshOptions) => {
    const { user, jti } = options;

    const payload: JWTRefreshPayload = {
        user,
        jti,
        iat: Math.floor(Date.now() / 1000)
    };

    const expiresIn = JWTConfig.refreshToken.expiresIn;
    const privateKey = refreshTokenKeys.privateKey;

    return jwt.sign(payload, privateKey, {
        expiresIn,
        algorithm: "RS256"
    });
}

export const verifyAccessJWT = (token: string) => {
    const publicKey = accessTokenKeys.publicKey;
    return verifyAccessToken(token, publicKey);
}

export const verifyRefreshJWT = (token: string) => {
    const publicKey = refreshTokenKeys.publicKey;

    try {
        jwt.verify(token, publicKey, { algorithms: ["RS256"] });
        return true;
    } catch {
        return false;
    }
}

export const decodeAccessJWT = (token: string) => {
    return decodeAccessToken(token);
}

export const decodeRefreshJWT = (token: string) => {
    return jwt.decode(token) as JWTRefreshPayload;
}