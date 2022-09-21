import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

import { verifyAccessToken } from "../../utils/jwt";

import UnauthorizedResponse from "../responses/Unauthorized.response";

const validJWTMiddleware = (domain: string, publicKeyAccessToken: string) => 
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
                method: "POST",
                headers: [ createHeaderCookies(req) ]
            });

            if (response.status === 200) {
                const setCookieHeader = response.headers.get("set-cookie");
                if (setCookieHeader) {
                    res.setHeader("set-cookie", setCookieHeader);
                }

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