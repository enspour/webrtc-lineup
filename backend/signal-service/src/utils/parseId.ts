import http from "http"
import cookie from "cookie";

import { decodeAccessToken } from "core/utils/jwt";

const parseId = (req: http.IncomingMessage) => {
    const parsedCookies = cookie.parse(req.headers.cookie || "")

    if ("accessToken" in parsedCookies) {
        const accessToken = parsedCookies["accessToken"]

        if (accessToken) {
            const token = JSON.parse(accessToken);
            const payload = decodeAccessToken(token);
            return payload.user.id;
        }
    }

    return "";
}

export default parseId;