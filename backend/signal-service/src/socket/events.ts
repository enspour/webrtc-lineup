import { Server, Socket } from "socket.io"

import Broadcast from "./notifications/Broadcast.notification";

import services from "./services";

import { Actions } from "./actions";

import logger from "@logger";

const initEvents = (_io: Server) => {
    const disconnectNotJoinedSocket = (socket: Socket) => {
        setTimeout(() => {
            if (socket.rooms.size === 1) {
                socket.disconnect();
            }
        }, 5000);
    }

    _io.on("connection", (socket: Socket) => {
        logger.log(`Connect socket: ${socket.id}`)

        disconnectNotJoinedSocket(socket)

        socket.on("disconnecting", _ => {
            const rooms = [...socket.rooms].filter(item => socket.id !== item);
            for (const roomId of rooms) {
                services.sockets.remove(socket, roomId);
                new Broadcast(Actions.NOTIFY_USER_LEAVE, { socketId: socket.id }).notify(socket, roomId);
            }
        })

        socket.on("disconnect", _ => {
            logger.log(`Disconnect socket: ${socket.id}`)
        })
    })
}

export default initEvents