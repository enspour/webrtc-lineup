import { Server, Socket } from "socket.io"

import { RoomActionsTypes, ConferenceActionsTypes } from "./types";

import Broadcast from "./notifications/Broadcast.notification";

import services from "./services";

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

    const disconnectingSocket = (socket: Socket) => {
        socket.once("disconnecting", _ => {
            const rooms = [...socket.rooms].filter(item => socket.id !== item);
            for (const roomId of rooms) {
                services.rooms.removeClient(roomId, socket.id);
                
                if (roomId.includes("|")) {
                    return new Broadcast(
                        ConferenceActionsTypes.NOTIFY_CONFERENCE_USER_LEFT, { socketId: socket.id }
                    ).notify(socket, roomId);
                }

                new Broadcast(RoomActionsTypes.NOTIFY_ROOM_USER_LEFT, { socketId: socket.id }).notify(socket, roomId);
            }
        });
    }

    _io.on("connection", (socket: Socket) => {
        logger.log(`Connect socket: ${socket.id}`)

        disconnectNotJoinedSocket(socket);
        disconnectingSocket(socket);

        socket.on("disconnect", _ => {
            logger.log(`Disconnect socket: ${socket.id}`);
        })
    })
}

export default initEvents