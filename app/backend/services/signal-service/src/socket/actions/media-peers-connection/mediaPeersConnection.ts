import { io } from "@socket/io";

import Context from "@socket/utils/SocketRouter/Context";

import ActionsTypes from "./actions.types";

import { OfferPayload } from "./validators/offer.validator";
import { AnswerPayload } from "./validators/answer.validator";
import { IceCandidatePayload } from "./validators/iceCandidate.validator";

class MediaPeersConnectionActions {
    sendOffer(context: Context<OfferPayload>) {
        const { channelId, peerId, offer } = context.Payload;

        if (context.User.Channels.has(channelId)) {
            const payload = { 
                socketId: context.User.SocketId, 
                userId: context.User.Id, 
                offer,
            };

            io.to(peerId).emit(ActionsTypes.ACCEPT_OFFER, payload);
            
            return context.success(
                ActionsTypes.NOTIFY_SEND_OFFER, 
                `Success send offer to ${peerId}`
            );
        }

        context.badRequest(
            ActionsTypes.NOTIFY_SEND_OFFER, 
            "You are not connected to channel"
        );
    }

    sendAnswer(context: Context<AnswerPayload>) {
        const { channelId, peerId, answer } = context.Payload;

        if (context.User.Channels.has(channelId)) {
            const payload = { 
                socketId: context.User.SocketId, 
                userId: context.User.Id,
                answer,
            };

            io.to(peerId).emit(ActionsTypes.ACCEPT_ANSWER, payload);
            
            return context.success(
                ActionsTypes.NOTIFY_SEND_ANSWER, 
                `Success send answer to ${peerId}`
            );
        }

        context.badRequest(
            ActionsTypes.NOTIFY_SEND_ANSWER, 
            "You are not connected to channel"
        );
    }

    sendIceCandidate(context: Context<IceCandidatePayload>) {
        const { channelId, peerId, iceCandidate } = context.Payload;

        if (context.User.Channels.has(channelId)) {
            const payload = { 
                socketId: context.User.SocketId, 
                iceCandidate 
            };
            
            io.to(peerId).emit(ActionsTypes.ACCEPT_ICE_CANDIDATE, payload);
            
            return context.success(
                ActionsTypes.NOTIFY_SEND_ICE_CANDIDATE, 
                `Success send ice candidate to ${peerId}`
            );
        }

        context.badRequest(
            ActionsTypes.NOTIFY_SEND_ICE_CANDIDATE, 
            "You are not connected to channel"
        );
    }
}

export default new MediaPeersConnectionActions();