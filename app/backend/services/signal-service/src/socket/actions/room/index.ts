import SocketRouter from "@socket/utils/SocketRouter";

import RoomActions from "./room.actions";
import ActionsTypes from "./actions.types";

import { joinValidator } from "./validators/join.validator";
import { idValidator } from "../validators/id.validator";

const joinValidation = {
    validate: joinValidator,
    action: ActionsTypes.NOTIFY_ROOM_JOIN
};

const leaveValidation = {
    validate: idValidator,
    action: ActionsTypes.NOTIFY_ROOM_LEAVE,
};

const initRoomActions = (router: SocketRouter) => {
    router.register(
        ActionsTypes.ROOM_JOIN,
        RoomActions.join, 
        joinValidation    
    );

    router.register(
        ActionsTypes.ROOM_LEAVE,
        RoomActions.leave, 
        leaveValidation
    );
}

export default initRoomActions;