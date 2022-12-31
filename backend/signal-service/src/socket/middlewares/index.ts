import { Server } from "socket.io";

import guard from "./guard.middleware";

const initMiddlewares = (io: Server) => {
    io.use(guard)
}

export default initMiddlewares;