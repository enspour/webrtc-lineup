import { Response } from "express";
import { nanoid } from "nanoid";

import {
    issueAccessJWT,
    issueRefreshJWT, 
    JWTAccessOptions,
    verifyRefreshJWT,
    decodeRefreshJWT
} from "@utils/jwt";

import { saveInSecureCookie, resetCookie } from "@utils/cookie";

import { convertTimeToMs } from "@utils/convertTimeToMs";

import jwtConfig from "@configs/jwt.config";

class JWTService {
    setTokens(options: JWTAccessOptions, res: Response) {
        this.#setAccessToken(options, res);
        this.#setRefreshToken(options, res);
    }

    #setAccessToken(options: JWTAccessOptions, res: Response) {
        const token = issueAccessJWT(options);
        const expiresAccessTokenMs = convertTimeToMs(jwtConfig.accessToken.expiresIn) || 0;
        const expiresAccessToken = new Date(Date.now() + expiresAccessTokenMs);

        saveInSecureCookie({
            name: "accessToken",
            value: token,
            expires: expiresAccessToken,
            maxAge: expiresAccessTokenMs
        }, res);
    }

    #setRefreshToken(options: JWTAccessOptions, res: Response) {
        const jti = nanoid();
        const { user } = options;

        const token = issueRefreshJWT({ jti, user });

        const expiresRefreshTokenMs = convertTimeToMs(jwtConfig.refreshToken.expiresIn) || 0;
        const expiresRefreshToken = new Date(Date.now() + expiresRefreshTokenMs);

        saveInSecureCookie({
            name: "refreshToken",
            value: token,
            expires: expiresRefreshToken,
            maxAge: expiresRefreshTokenMs
        }, res);
    }

    clearTokens(res: Response) {
        resetCookie("accessToken", res);
        resetCookie("refreshToken", res);
    }

    refreshTokens(refreshToken: string, res: Response) {
        const verified = verifyRefreshJWT(refreshToken);
        if (verified) {
            const payload = decodeRefreshJWT(refreshToken);
            this.setTokens(payload, res);
            return true;
        }

        return false;
    }
}

export default new JWTService();