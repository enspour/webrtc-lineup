import { Server, Socket } from "socket.io"

import roomActions from "./rooms/room.actions";
import idValidator from "./rooms/validators/id.validator";
import joinValidator from "./rooms/validators/join.validator";

import ActionManager from "./Action.manager";

export const Actions = {
    GET_USERS: "room:get_users",
    NOTIFY_GET_USERS: "notify:room:get_users",

    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:room:user:leave",
    NOTIFY_USER_JOIN: "notify:room:user:join",


    JOIN_CONFERENCE: "room:conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:room:conference:join",

    LEAVE_CONFERENCE: "room:conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:room:conference:leave",

    NOTIFY_USER_JOIN_CONFERENCE: "notify:room:conference:user:join",
    NOTIFY_USER_LEAVE_CONFERENCE: "notify:room:conference:user:leave",

    SEND_ICE_CANDIDATE: "webrtc:send_ice-candidate",
    ACCEPT_ICE_CANDIDATE: "webrtc:accept_ice-candidate",

    SEND_OFFER: "webrtc:send_offer",
    ACCEPT_OFFER: "webrtc:accept_offer",    

    SEND_ANSWER: "webrtc:send_answer",
    ACCEPT_ANSWER: "webrtc:accept_answer",
}

const initActions = (io: Server) => {
    io.on("connection", (socket: Socket) => { 
        socket.on(
            Actions.JOIN_ROOM,
            ActionManager.create(socket, roomActions.join, joinValidator, Actions.NOTIFY_JOIN)    
        );

        socket.on(
            Actions.LEAVE_ROOM,
            ActionManager.create(socket, roomActions.leave, idValidator, Actions.NOTIFY_LEAVE)
        );

        socket.on(
            Actions.GET_USERS,
            ActionManager.create(socket, roomActions.getClients, idValidator, Actions.NOTIFY_GET_USERS)
        );
    })
}

export default initActions;