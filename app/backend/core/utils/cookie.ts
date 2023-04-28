import { Request } from "express";

export const getCookie = (name: string, req: Request) => {
    const cookie = req.cookies[name];

    if (cookie) {
        return JSON.parse(cookie);
    }

    return null;
}