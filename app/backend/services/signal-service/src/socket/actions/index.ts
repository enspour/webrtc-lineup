import { Server, Socket } from "socket.io";

import RoomActionsTypes from "./room/actions.types";

import Unauthorized from "@socket/notifications/Unauthorized.notification";

import SocketRouter from "@socket/utils/SocketRouter";

import initRoomActions from "./room";
import initConferenceActions from "./conference";
import initMediaPeersConnectionActions from "./media-peers-connection";

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => { 
        try {
            const router = new SocketRouter(socket);

            initRoomActions(router);
            initConferenceActions(router);
            initMediaPeersConnectionActions(router);
        } catch (err) {
            if (err instanceof Error) {
                new Unauthorized(RoomActionsTypes.NOTIFY_ROOM_JOIN, err.message).notify(socket);
            }
            
            socket.disconnect(true);
        }
    });
}

export default initActions;