import { Server, Socket } from "socket.io";

import initRoomActions from "./room";
import initConferenceActions from "./conference";

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => { 
        initRoomActions(socket)        
        initConferenceActions(socket);
    });
}

export default initActions;