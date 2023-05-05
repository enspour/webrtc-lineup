import { Socket } from "socket.io";

import { ConferenceActionsTypes } from "@socket/types";
import ConferenceActions from "./conference.actions";

import { idValidator } from "../validators/id.validator";
import { joinValidator } from "./validators/join.validator";
import { sendMessageValidator } from "./validators/sendMessage.validator";

import services from "@socket/services";

const joinValidation = {
    validate: joinValidator,
    action: ConferenceActionsTypes.NOTIFY_JOIN_CONFERENCE
};

const leaveValidation = {
    validate: idValidator,
    action: ConferenceActionsTypes.NOTIFY_LEAVE_CONFERENCE,
};

const sendMessageValidation = {
    validate: sendMessageValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT
}

const initConferenceActions = (socket: Socket) => {
    socket.on(
        ConferenceActionsTypes.JOIN_CONFERENCE,
        services.actions.create(socket, ConferenceActions.join, joinValidation)
    );

    socket.on(
        ConferenceActionsTypes.LEAVE_CONFERENCE,
        services.actions.create(socket, ConferenceActions.leave, leaveValidation)
    );

    socket.on(
        ConferenceActionsTypes.SEND_MESSAGE_CONFERENCE_CHAT,
        services.actions.create(socket, ConferenceActions.sendMessage, sendMessageValidation)
    );
}

export default initConferenceActions;