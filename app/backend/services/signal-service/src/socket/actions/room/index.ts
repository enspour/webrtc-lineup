import { Socket } from "socket.io";

import { RoomActionsTypes } from "@socket/types";
import RoomActions from "./room.actions";

import { joinValidator } from "./validators/join.validator";
import { idValidator } from "../validators/id.validator";

import services from "@socket/services";

const joinValidation = {
    validate: joinValidator,
    action: RoomActionsTypes.NOTIFY_JOIN
};

const leaveValidation = {
    validate: idValidator,
    action: RoomActionsTypes.NOTIFY_LEAVE,
};

const initRoomActions = (socket: Socket) => {
    socket.on(
        RoomActionsTypes.JOIN_ROOM,
        services.actions.create(socket, RoomActions.join, joinValidation)    
    );

    socket.on(
        RoomActionsTypes.LEAVE_ROOM,
        services.actions.create(socket, RoomActions.leave, leaveValidation)
    );
}

export default initRoomActions;