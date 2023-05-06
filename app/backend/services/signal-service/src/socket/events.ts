import { Server, Socket } from "socket.io"

import ConferenceActionTypes from "./actions/conference/actions.types";
import RoomActionTypes from "./actions/room/actions.types";

import Broadcast from "./notifications/Broadcast.notification";

import services from "./services";

import logger from "@logger";

const initEvents = (_io: Server) => {
    const disconnectNotJoinedSocket = (socket: Socket) => {
        const timeout = setTimeout(() => {
            if (socket.rooms.size === 1) {
                socket.disconnect(true);
            }
        }, 5000);

        socket.on("disconnect", _ => {
            clearTimeout(timeout);
        });
    }

    const disconnectingSocket = (socket: Socket) => {
        socket.once("disconnecting", _ => {
            const channels = [...socket.rooms].filter(item => socket.id !== item);

            for (const channelId of channels) {
                const channel = services.channels.getChannel(channelId);

                if (channel) {
                    if (channel.type === "room") {
                        new Broadcast(
                            RoomActionTypes.NOTIFY_ROOM_USER_LEFT, 
                            { socketId: socket.id }
                        ).notify(socket, channelId);
                    }

                    if (channel.type === "conference") {
                        new Broadcast(
                            ConferenceActionTypes.NOTIFY_CONFERENCE_USER_LEFT, 
                            { socketId: socket.id }
                        ).notify(socket, channelId);
                    }
                }

                services.channels.leave(channelId, socket.id);
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