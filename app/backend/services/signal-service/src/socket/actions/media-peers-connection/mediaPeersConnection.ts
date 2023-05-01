import { io } from "@socket/io";

import { ActionContext } from "@socket/services/Actions.service";

import { MediaPeersConnectionActionsTypes } from "@socket/types";

import { OfferPayload } from "./validators/offer.validator";
import { AnswerPayload } from "./validators/answer.validator";
import { IceCandidatePayload } from "./validators/iceCandidate.validator";

class MediaPeersConnectionActions {
    sendOffer(context: ActionContext<OfferPayload>) {
        const { channelId, peerId, offer } = context.Payload;

        if (context.Client.has(channelId)) {
            const payload = { 
                socketId: context.Client.SocketId, 
                userId: context.Client.UserId, 
                offer,
            };

            io.to(peerId).emit(MediaPeersConnectionActionsTypes.ACCEPT_OFFER, payload);
            
            return context.success(
                MediaPeersConnectionActionsTypes.NOTIFY_SEND_OFFER, 
                `Success send offer to ${peerId}`
            );
        }

        context.badRequest(
            MediaPeersConnectionActionsTypes.NOTIFY_SEND_OFFER, 
            "You are not connected to channel"
        );
    }

    sendAnswer(context: ActionContext<AnswerPayload>) {
        const { channelId, peerId, answer } = context.Payload;

        if (context.Client.has(channelId)) {
            const payload = { 
                socketId: context.Client.SocketId, 
                userId: context.Client.UserId,
                answer,
            };

            io.to(peerId).emit(MediaPeersConnectionActionsTypes.ACCEPT_ANSWER, payload);
            
            return context.success(
                MediaPeersConnectionActionsTypes.NOTIFY_SEND_ANSWER, 
                `Success send answer to ${peerId}`
            );
        }

        context.badRequest(
            MediaPeersConnectionActionsTypes.NOTIFY_SEND_ANSWER, 
            "You are not connected to channel"
        );
    }

    sendIceCandidate(context: ActionContext<IceCandidatePayload>) {
        const { channelId, peerId, iceCandidate } = context.Payload;

        if (context.Client.has(channelId)) {
            const payload = { 
                socketId: context.Client.SocketId, 
                iceCandidate 
            };
            
            io.to(peerId).emit(MediaPeersConnectionActionsTypes.ACCEPT_ICE_CANDIDATE, payload);
            
            return context.success(
                MediaPeersConnectionActionsTypes.NOTIFY_SEND_ICE_CANDIDATE, 
                `Success send ice candidate to ${peerId}`
            );
        }

        context.badRequest(
            MediaPeersConnectionActionsTypes.NOTIFY_SEND_ICE_CANDIDATE, 
            "You are not connected to channel"
        );
    }
}

export default new MediaPeersConnectionActions();