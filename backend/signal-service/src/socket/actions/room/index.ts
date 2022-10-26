import { Socket } from "socket.io";

import TypesActions from "./types.actions";
import RoomActions from "./room.actions";

import { joinRoomValidator } from "./validators/joinRoom.validator";
import { idValidator } from "../validators/id.validator";

import services from "@socket/services";

const joinValidator = {
    validate: joinRoomValidator,
    action: TypesActions.NOTIFY_JOIN
};

const leaveValidator = {
    validate: idValidator,
    action: TypesActions.NOTIFY_LEAVE,
};

const getClientsValidator = {
    validate: idValidator,
    action: TypesActions.NOTIFY_GET_USERS,
};

const initRoomActions = (socket: Socket) => {
    socket.on(
        TypesActions.JOIN_ROOM,
        services.actions.create(socket, RoomActions.join, joinValidator)    
    );

    socket.on(
        TypesActions.LEAVE_ROOM,
        services.actions.create(socket, RoomActions.leave, leaveValidator)
    );

    socket.on(
        TypesActions.GET_USERS,
        services.actions.create(socket, RoomActions.getClients, getClientsValidator)
    );
}

export default initRoomActions;