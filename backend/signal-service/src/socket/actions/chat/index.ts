import { Socket } from "socket.io";

import { ChatActionsTypes } from "@socket/types";
import ChatActions from "./chat.actions";

import { sendMessageValidator } from "./validators/sendMessage.validator";

import services from "@socket/services";

const sendMessageValidation = {
    validate: sendMessageValidator,
    action: ChatActionsTypes.NOTIFY_SEND_MESSAGE
}

const initChatActions = (socket: Socket) => {
    socket.on(
        ChatActionsTypes.SEND_MESSAGE,
        services.actions.create(socket, ChatActions.sendMessage, sendMessageValidation)
    );
}

export default initChatActions;