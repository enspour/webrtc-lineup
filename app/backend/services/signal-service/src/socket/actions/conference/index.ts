import SocketRouter from "@socket/utils/SocketRouter";

import ConferenceActions from "./conference.actions";
import ActionsTypes from "./actions.types";

import { idValidator } from "../validators/id.validator";
import { joinValidator } from "./validators/join.validator";
import { sendMessageValidator } from "./validators/sendMessage.validator";

const joinValidation = {
    validate: joinValidator,
    action: ActionsTypes.NOTIFY_JOIN_CONFERENCE
};

const leaveValidation = {
    validate: idValidator,
    action: ActionsTypes.NOTIFY_LEAVE_CONFERENCE,
};

const sendMessageValidation = {
    validate: sendMessageValidator,
    action: ActionsTypes.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT
}

const initConferenceActions = (router: SocketRouter) => {
    router.register(
        ActionsTypes.JOIN_CONFERENCE,
        ConferenceActions.join, 
        joinValidation
    );

    router.register(
        ActionsTypes.LEAVE_CONFERENCE,
        ConferenceActions.leave, 
        leaveValidation
    );

    router.register(
        ActionsTypes.SEND_MESSAGE_CONFERENCE_CHAT,
        ConferenceActions.sendMessage, 
        sendMessageValidation
    );
}

export default initConferenceActions;