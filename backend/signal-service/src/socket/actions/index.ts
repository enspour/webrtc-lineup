import { Server, Socket } from "socket.io"

import { onJoinRoom, onLeaveRoom } from "./room.actions";

export const Actions = {
    JOIN_ROOM: "room:join",
    LEAVE_ROOM: "room:leave",
}

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on(Actions.JOIN_ROOM, onJoinRoom)
        socket.on(Actions.LEAVE_ROOM, onLeaveRoom)
    })
}

export default initActions;