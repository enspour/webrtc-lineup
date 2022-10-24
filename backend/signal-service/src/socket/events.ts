import { Server, Socket } from "socket.io"

import logger from "@logger";

const initEvents = (_io: Server) => {
    const disconnectNotJoinedSocket = (socket: Socket) => {
        const timeout = setTimeout(() => {
            if (socket.rooms.size === 1) {
                socket.disconnect();
            }
        }, 5000);

        socket.on("disconnect", _ => {
            clearTimeout(timeout);
        });
    }

    _io.on("connection", (socket: Socket) => {
        logger.log(`Connect socket: ${socket.id}`)

        disconnectNotJoinedSocket(socket)

        socket.on("disconnect", _ => {
            logger.log(`Disconnect socket: ${socket.id}`);
        })
    })
}

export default initEvents