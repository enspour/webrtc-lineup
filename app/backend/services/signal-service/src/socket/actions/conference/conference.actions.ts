import { ActionContext } from "@socket/services/Actions.service";

import { ConferenceActionsTypes } from "@socket/types";

import { IdPayload } from "../validators/id.validator";
import { JoinPayload } from "./validators/join.validator";
import { SendMessagePayload } from "./validators/sendMessage.validator";

import AuthService from "@services-communication/services/Auth.service";
import ChatService from "@services-communication/services/Chat.service";

class ConferenceActions {
    async join(context: ActionContext<JoinPayload>) {
        const { roomId, conferenceId } = context.Payload;

        if (context.Client.has(roomId)) {
            if (!context.Client.has(conferenceId)) {
                await context.Client.join(conferenceId);

                const payload = { 
                    socketId: context.Client.SocketId,
                    userId: context.Client.UserId, 
                }
                
                context.broadcast(
                    conferenceId, 
                    ConferenceActionsTypes.NOTIFY_USER_JOIN_CONFERENCE, 
                    payload
                );
                
                return context.success(
                    ConferenceActionsTypes.NOTIFY_JOIN_CONFERENCE, 
                    "Success to join to conference"
                );
            }

            return context.success(
                ConferenceActionsTypes.NOTIFY_JOIN_CONFERENCE, 
                "Already connected to conference"
            );
        }

        context.badRequest(
            ConferenceActionsTypes.NOTIFY_JOIN_CONFERENCE, 
            "You are not connected to room"
        );
    }

    async leave(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            await context.Client.leave(id);
            
            const payload = {
                socketId: context.Client.SocketId,
                userId: context.Client.UserId,
            }
            
            context.broadcast(
                id, 
                ConferenceActionsTypes.NOTIFY_USER_LEAVE_CONFERENCE, 
                payload
            );
            
            return context.success(
                ConferenceActionsTypes.NOTIFY_LEAVE_CONFERENCE, 
                "Success leave from conference"
            );
        }

        context.badRequest(
            ConferenceActionsTypes.NOTIFY_LEAVE_CONFERENCE, 
            "You are not connected to conference"
        );
    }

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
                        ConferenceActionsTypes.NOTIFY_NEW_MESSAGE, 
                        { message }
                    );
                    
                    return context.success(
                        ConferenceActionsTypes.NOTIFY_SEND_MESSAGE, 
                        "Success send message.", 
                        { tempId, message }
                    );
                }
            }

            return context.serverError(
                ConferenceActionsTypes.NOTIFY_SEND_MESSAGE,
                "Woops... Server error."
            );
        }
       
        context.badRequest(
            ConferenceActionsTypes.NOTIFY_SEND_MESSAGE,
            "You are not connected to room."
        );
    }
}

export default new ConferenceActions();