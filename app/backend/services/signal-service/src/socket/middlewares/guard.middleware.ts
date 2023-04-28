// import cookie from "cookie";
// import { Socket } from "socket.io";
// import { ExtendedError } from "socket.io/dist/namespace";

// import { accessToken as keys } from "@loaders/jwt.keys";

// import { verifyAccessToken } from "core/utils/jwt";

// export default (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
//     const parsedCookies = cookie.parse(socket.request.headers.cookie || "")

//     if ("accessToken" in parsedCookies) {
//         const accessToken = parsedCookies["accessToken"]

//         if (accessToken) {
//             try {
//                 const token = JSON.parse(accessToken);
//                 const verified = verifyAccessToken(token, keys.publicKey);
                
//                 if (verified) {
//                     return next();
//                 }
//             } catch {}
//         }
//     }

//     next(new Error("Unauthorized. Please authorize."))
// }