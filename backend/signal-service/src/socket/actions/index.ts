import { Server, Socket } from "socket.io"

import { initGetUsersRoom, initJoinRoom, initLeaveRoom } from "./rooms/room.actions";

export const Actions = {
    GET_USERS: "room:get_users",
    NOTIFY_GET_USERS: "notify:room:get_users",

    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:user:leave",
    NOTIFY_USER_JOIN: "notify:user:join"
}

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on(Actions.JOIN_ROOM, initJoinRoom(socket));
        socket.on(Actions.LEAVE_ROOM, initLeaveRoom(socket));
        socket.on(Actions.GET_USERS, initGetUsersRoom(socket));
    })
}

export default initActions;