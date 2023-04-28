import { Socket } from "socket.io";

import { RoomActionsTypes } from "@socket/types";
import RoomActions from "./room.actions";

import { joinRoomValidator } from "./validators/joinRoom.validator";
import { idValidator } from "../validators/id.validator";

import services from "@socket/services";

const joinValidator = {
    validate: joinRoomValidator,
    action: RoomActionsTypes.NOTIFY_JOIN
};

const leaveValidator = {
    validate: idValidator,
    action: RoomActionsTypes.NOTIFY_LEAVE,
};

const getClientsValidator = {
    validate: idValidator,
    action: RoomActionsTypes.NOTIFY_GET_USERS,
};

const initRoomActions = (socket: Socket) => {
    socket.on(
        RoomActionsTypes.JOIN_ROOM,
        services.actions.create(socket, RoomActions.join, joinValidator)    
    );

    socket.on(
        RoomActionsTypes.LEAVE_ROOM,
        services.actions.create(socket, RoomActions.leave, leaveValidator)
    );

    socket.on(
        RoomActionsTypes.GET_USERS,
        services.actions.create(socket, RoomActions.getClients, getClientsValidator)
    );
}

export default initRoomActions;