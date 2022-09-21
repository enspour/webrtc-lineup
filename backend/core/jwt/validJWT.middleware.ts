import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./AccessToken";

import UnauthorizedResponse from "../server-responses/responses/Unauthorized.response";

const domain = process.env.DOMAIN || "http://localhost:3000";

const validJWTMiddleware = (publicKeyAccessToken: string) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const cookie = req.cookies["accessToken"];

        if (cookie) {
            const token = JSON.parse(cookie);
            const verified = verifyAccessToken(token, publicKeyAccessToken);

            if (verified) {
                return next();
            }
        }

        try {
            const response = await fetch(`${domain}/api/v1/auth-service/refresh`, {
                headers: [ createHeaderCookies(req) ]
            });

            if (response.status === 200) {
                return next();
            }
        } catch {}

        new UnauthorizedResponse("Please authorize.").send(res);
    }

function createHeaderCookies(req: Request): [string, string] {
    const cookies = req.cookies;
    const preparedCookies: string[][] = [];
    
    for (let cookie in cookies) {
        preparedCookies.push([`${cookie}="${cookies[cookie]}"`]);
    }
    
    return ["Cookie", preparedCookies.join(";")];
}

export default validJWTMiddleware;