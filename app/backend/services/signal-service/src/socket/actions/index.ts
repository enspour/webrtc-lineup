import { Server, Socket } from "socket.io";

import initRoomActions from "./room";
import initConferenceActions from "./conference";
import initMediaPeersConnectionActions from "./media-peers-connection";

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => { 
        initRoomActions(socket);
        initConferenceActions(socket);
        initMediaPeersConnectionActions(socket);
    });
}

export default initActions;