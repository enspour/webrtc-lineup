import { Request } from "express";

import { getCookie } from "./cookie";
import { decodeAccessToken } from "./jwt";

export const getUser = (req: Request) => {
    const token = getCookie("accessToken", req);
    const payload = decodeAccessToken(token);

    return { ...payload.user, id: BigInt(payload.user.id)};
}