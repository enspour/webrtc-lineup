import { Server, Socket } from "socket.io";

import initRoomActions from "./room";
import initConferenceActions from "./conference";
import initChatActions from "./chat";

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => { 
        initRoomActions(socket);
        initConferenceActions(socket);
        initChatActions(socket);
    });
}

export default initActions;