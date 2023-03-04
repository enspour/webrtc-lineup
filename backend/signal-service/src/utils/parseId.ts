import http from "http"
import cookie from "cookie";

import { accessToken as keys } from "@loaders/jwt.keys";

import { decodeAccessToken, verifyAccessToken } from "core/utils/jwt";

const parseId = (req: http.IncomingMessage) => {
    try {
        const parsedCookies = cookie.parse(req.headers.cookie || "")
    
        if ("accessToken" in parsedCookies) {
            const accessToken = parsedCookies["accessToken"]
    
            if (accessToken) {
                const token = JSON.parse(accessToken);
                const verified = verifyAccessToken(token, keys.publicKey);
                
                if (verified) {
                    const payload = decodeAccessToken(token);
                    return payload.user.id;
                }
            }
        }
    } catch {}

    throw new Error("Unauthorized. Please authorize.");
}

export default parseId;