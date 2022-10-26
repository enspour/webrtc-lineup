import { Server, Socket } from "socket.io";

import initRoomActions from "./room";
import initConferenceActions from "./conference";

import TypesActionsRoom from "./room/types.actions";
import TypesActionsConference from "./conference/types.actions";

import Broadcast from "@socket/notifications/Broadcast.notification";

import services from "@socket/services";

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => { 
        initRoomActions(socket)        
        initConferenceActions(socket);

        socket.once("disconnecting", _ => {
            const rooms = [...socket.rooms].filter(item => socket.id !== item);
            for (const roomId of rooms) {
                services.rooms.removeClient(roomId, socket.id);
                
                if (roomId.endsWith("/conference")) {
                    return new Broadcast(
                        TypesActionsConference.NOTIFY_USER_LEAVE_CONFERENCE, { socketId: socket.id }
                    ).notify(socket, roomId);
                } 

                new Broadcast(TypesActionsRoom.NOTIFY_USER_LEAVE, { socketId: socket.id });
            }
        });
    });
}

export default initActions;