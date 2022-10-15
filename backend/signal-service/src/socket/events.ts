import { Server, Socket } from "socket.io"

import logger from "@logger";

const initEvents = (_io: Server) => {
    _io.on("connection", (socket: Socket) => {
        logger.log(`Connect socket: ${socket.id}`)

        setTimeout(() => {
            if (socket.rooms.size === 1) {
                socket.disconnect();
            }
        }, 3000);
    })

    _io.on("connection", (socket: Socket) => {
        socket.on("disconnect", (reason) => {
            logger.log(`Disconnect socket: ${socket.id}`)
        })
    })
}

export default initEvents