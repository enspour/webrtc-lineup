import { Server, Socket } from "socket.io"

import { initJoinRoom, initLeaveRoom } from "./rooms/room.actions";

export const Actions = {
    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:user:leave",
    NOTIFY_USER_JOIN: "notify:user:join"
}

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on(Actions.JOIN_ROOM, initJoinRoom(socket))
        socket.on(Actions.LEAVE_ROOM, initLeaveRoom(socket))
    })
}

export default initActions;