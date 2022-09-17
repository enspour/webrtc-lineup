import { Request, Response } from "express";

import serverConfig from "@configs/server.config";

export interface ICookie {
    name: string,
    value: any,
    expires: Date,
    maxAge: number
}

export const saveInSecureCookie = (cookie: ICookie, res: Response) => {
    const { name, value, expires, maxAge } = cookie;

    res.cookie(name, JSON.stringify(value), {
        secure: serverConfig.environment === "production",
        httpOnly: true,
        expires,
        maxAge 
    })
}

export const resetCookie = (name: string, res: Response) => {
    res.cookie(name, "", {
        secure: serverConfig.environment === "production",
        httpOnly: true,
    })
}

export const getCookie = (name: string, req: Request) => {
    const cookie = req.cookies[name];

    if (cookie) {
        return JSON.parse(cookie);
    }

    return null;
}