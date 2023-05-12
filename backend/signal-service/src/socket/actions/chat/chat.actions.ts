import { ActionContext } from "@socket/services/Actions.service";

import { SendMessagePayload } from "./validators/sendMessage.validator";

import ChatService from "@services-communication/services/Chat.service";
import { ChatActionsTypes } from "@socket/types";
import AuthService from "@services-communication/services/Auth.service";

class ChatActions {
    async sendMessage(context: ActionContext<SendMessagePayload>) {
        const conferenceId = context.Payload.conferenceId;

        if (context.Client.has(conferenceId)) {
            const userId = context.Client.UserId;
            const { text } = context.Payload;

            const user = await AuthService.findUser(userId);

            if (user) {
                const message = await ChatService.createMessage(conferenceId, text, user);
    
                if (message) {
                    const tempId = context.Payload.tempId;
    
                    context.broadcast(
                        conferenceId, 
                        ChatActionsTypes.NOTIFY_NEW_MESSAGE, 
                        { message }
                    );
                    
                    return context.success(
                        ChatActionsTypes.NOTIFY_SEND_MESSAGE, 
                        "Success send message.", 
                        { tempId, message }
                    );
                }
            }

            return context.serverError(
                ChatActionsTypes.NOTIFY_SEND_MESSAGE,
                "Woops... Server error."
            );
        }
       
        context.badRequest(
            ChatActionsTypes.NOTIFY_SEND_MESSAGE,
            "You are not connected to room."
        );
    }
}

export default new ChatActions();