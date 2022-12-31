import { Request, Response, NextFunction } from "express";

import { getCookie } from "./cookie";
import { verifyAccessToken } from "./jwt";

import UnauthorizedResponse from "core/server/responses/Unauthorized.response";

const guardInit = (publicKey: string) => 
    (req: Request, res: Response, next: NextFunction) => {
        const accessToken = getCookie("accessToken", req);
        if (accessToken) {
            const verified = verifyAccessToken(accessToken, publicKey);

            if (verified) {
                return next();
            }
        }
        
        new UnauthorizedResponse("Please authorize").send(res);
    }

export default guardInit;