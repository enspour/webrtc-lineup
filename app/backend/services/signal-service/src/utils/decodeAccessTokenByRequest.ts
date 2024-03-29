import http from "http"
import cookie from "cookie";

import { accessToken as keys } from "@loaders/jwt.keys";

import { decodeAccessToken, verifyAccessToken } from "core/utils/jwt";

const decodeAccessTokenByRequest = (req: http.IncomingMessage) => {
    try {
        const parsedCookies = cookie.parse(req.headers.cookie || "")
    
        if ("accessToken" in parsedCookies) {
            const accessToken = parsedCookies["accessToken"]
    
            if (accessToken) {
                const token = JSON.parse(accessToken);
                const verified = verifyAccessToken(token, keys.publicKey);

                if (verified) {
                    return decodeAccessToken(token);
                }
            }
        }
    } catch {}

    throw new Error("Unauthorized. Please authorize.");
}

export default decodeAccessTokenByRequest;