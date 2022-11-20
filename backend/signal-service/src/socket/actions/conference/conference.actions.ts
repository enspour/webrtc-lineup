import { io } from "@socket/io";

import { ActionContext } from "@socket/services/Actions.service";

import { ConferenceActionsTypes } from "@socket/types";

import { OfferPayload } from "./validators/offer.validator";
import { AnswerPayload } from "./validators/answer.validator";
import { IceCandidatePayload } from "./validators/iceCandidate.validator";
import { IdPayload } from "../validators/id.validator";

class ConferenceActions {
    async join(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (id.includes("|")) {
            const [roomId] = id.split("|");
    
            if (context.Client.has(roomId)) {
                if (!context.Client.has(id)) {
                    await context.Client.join(id);
    
                    const payload = { socketId: context.Client.SocketId }
                    
                    context.broadcast(
                        id, 
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
            
            const payload = { socketId: context.Client.SocketId }
            
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

    sendOffer(context: ActionContext<OfferPayload>) {
        const { conferenceId, destinationId, offer } = context.Payload;

        if (context.Client.has(conferenceId)) {
            const payload = { sourceId: context.Client.SocketId, offer };

            io.to(destinationId).emit(ConferenceActionsTypes.ACCEPT_OFFER, payload);
            
            return context.success(
                ConferenceActionsTypes.NOTIFY_SEND_OFFER, 
                `Success send offer to ${destinationId}`
            );
        }

        context.badRequest(
            ConferenceActionsTypes.NOTIFY_SEND_OFFER, 
            "You are not connected to conference"
        );
    }

    sendAnswer(context: ActionContext<AnswerPayload>) {
        const { conferenceId, destinationId, answer } = context.Payload;

        if (context.Client.has(conferenceId)) {
            const payload = { sourceId: context.Client.SocketId, answer };

            io.to(destinationId).emit(ConferenceActionsTypes.ACCEPT_ANSWER, payload);
            
            return context.success(
                ConferenceActionsTypes.NOTIFY_SEND_ANSWER, 
                `Success send answer to ${destinationId}`
            );
        }

        context.badRequest(
            ConferenceActionsTypes.NOTIFY_SEND_ANSWER, 
            "You are not connected to conference"
        );
    }

    sendIceCandidate(context: ActionContext<IceCandidatePayload>) {
        const { conferenceId, destinationId, iceCandidate } = context.Payload;

        if (context.Client.has(conferenceId)) {
            const payload = { sourceId: context.Client.SocketId, iceCandidate };
            
            io.to(destinationId).emit(ConferenceActionsTypes.ACCEPT_ICE_CANDIDATE, payload);
            
            return context.success(
                ConferenceActionsTypes.NOTIFY_SEND_ICE_CANDIDATE, 
                `Success send ice candidate to ${destinationId}`
            );
        }

        context.badRequest(
            ConferenceActionsTypes.NOTIFY_SEND_ICE_CANDIDATE, 
            "You are not connected to conference"
        );
    }
}

export default new ConferenceActions();