import { Request, Response, NextFunction } from "express";

import JWTService from "@services/JWT.service";

import { verifyAccessJWT } from "@utils/jwt";
import { getCookie } from "@utils/cookie";

import UnauthorizedResponse from "core/server-responses/responses/Unauthorized.response";

const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = getCookie("accessToken", req);
    if (accessToken) {
        const verified = verifyAccessJWT(accessToken);

        if (verified) {
            return next();
        }
    }

    const refreshToken = getCookie("refreshToken", req);
    if (refreshToken) {
        const isRefreshTokens = JWTService.refreshTokens(refreshToken, res);

        if (isRefreshTokens) {
            return next();
        }
    }
    
    new UnauthorizedResponse("Please authorize.").send(res);
}

export default guardMiddleware;