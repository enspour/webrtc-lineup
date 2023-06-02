import Context from "@socket/utils/SocketRouter/Context";

import ActionsTypes from "./actions.types";

import { IdPayload } from "../validators/id.validator";
import { JoinPayload } from "./validators/join.validator";
import { SendMessagePayload } from "./validators/sendMessage.validator";

import ChatServiceAPI from "core/services-communications/api/ChatService.api";

class ConferenceActions {
    async join(context: Context<JoinPayload>) {
        const { roomId, conferenceId } = context.Payload;

        if (context.User.Channels.has(roomId)) {
            if (!context.User.Channels.has(conferenceId)) {
                await context.User.Channels.join(conferenceId, "conference");

                const payload = {
                    socketId: context.User.SocketId,
                    userId: context.User.Id, 
                }
                
                context.broadcast(
                    conferenceId, 
                    ActionsTypes.NOTIFY_CONFERENCE_USER_JOINED, 
                    payload
                );
                
                return context.success(
                    ActionsTypes.NOTIFY_JOIN_CONFERENCE, 
                    "Success to join to conference"
                );
            }

            return context.success(
                ActionsTypes.NOTIFY_JOIN_CONFERENCE, 
                "Already connected to conference"
            );
        }

        context.badRequest(
            ActionsTypes.NOTIFY_JOIN_CONFERENCE, 
            "You are not connected to room"
        );
    }

    async leave(context: Context<IdPayload>) {
        const { id } = context.Payload;

        if (context.User.Channels.has(id)) {
            await context.User.Channels.leave(id);
            
            const payload = {
                socketId: context.User.SocketId,
                userId: context.User.Id,
            }
            
            context.broadcast(
                id, 
                ActionsTypes.NOTIFY_CONFERENCE_USER_LEFT, 
                payload
            );
            
            return context.success(
                ActionsTypes.NOTIFY_LEAVE_CONFERENCE, 
                "Success leave from conference"
            );
        }

        context.badRequest(
            ActionsTypes.NOTIFY_LEAVE_CONFERENCE, 
            "You are not connected to conference"
        );
    }

    async sendMessage(context: Context<SendMessagePayload>) {
        const conferenceId = context.Payload.conferenceId;

        if (context.User.Channels.has(conferenceId)) {
            const userId = context.User.Id;
            const userName = context.User.Name;

            const { text } = context.Payload;
            
            const user = {
                id: userId,
                name: userName
            }

            const response = await ChatServiceAPI.createMessage(conferenceId, text, user);

            if (response.status === 200) {
                const data = await response.json();
                const message = data.body.message;
                
                const tempId = context.Payload.tempId;
    
                context.broadcast(
                    conferenceId, 
                    ActionsTypes.NOTIFY_CONFERENCE_CHAT_NEW_MESSAGE, 
                    { message }
                );
                
                return context.success(
                    ActionsTypes.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT, 
                    "Success send message.", 
                    { tempId, message }
                );
            }
            
            return context.serverError(
                ActionsTypes.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT, 
                "Error server"
            );
        }
       
        context.badRequest(
            ActionsTypes.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT,
            "You are not connected to room."
        );
    }
}

export default new ConferenceActions();