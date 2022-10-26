import { io } from "@socket/io";

import { ActionContext } from "@socket/services/Actions.service";

import TypesActions from "./types.actions";

import { IdPayload } from "../validators/id.validator";
import { OfferPayload } from "./validators/offer.validator";
import { AnswerPayload } from "./validators/answer.validator";
import { IceCandidatePayload } from "./validators/iceCandidate.validator";

class ConferenceActions {
    async join(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            const conferenceId = `${id}/conference`;

            if (!context.Client.has(conferenceId)) {
                await context.Client.join(conferenceId);

                const payload = { socketId: context.Client.SocketId }
                context.broadcast(conferenceId, TypesActions.NOTIFY_USER_JOIN_CONFERENCE, payload);
                return context.success(TypesActions.NOTIFY_JOIN_CONFERENCE, "Success to join to conference");
            }

            return context.success(TypesActions.NOTIFY_JOIN_CONFERENCE, "Already connected to conference");
        }

        context.badRequest(TypesActions.NOTIFY_JOIN_CONFERENCE, "You are not connected to room");
    }

    async leave(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        const conferenceId = `${id}/conference`;

        if (context.Client.has(conferenceId)) {
            await context.Client.leave(conferenceId);
            
            const payload = { socketId: context.Client.SocketId }
            context.broadcast(conferenceId, TypesActions.NOTIFY_LEAVE_CONFERENCE, payload);
            return context.success(TypesActions.NOTIFY_LEAVE_CONFERENCE, "Success leave from conference");
        }

        context.badRequest(TypesActions.NOTIFY_LEAVE_CONFERENCE, "You are not connected to conference");
    }

    sendOffer(context: ActionContext<OfferPayload>) {
        const { roomId, destinationId, offer } = context.Payload;

        const conferenceId = `${roomId}/conference`;

        if (context.Client.has(conferenceId)) {
            const payload = { sourceId: context.Client.SocketId, offer };
            io.to(destinationId).emit(TypesActions.ACCEPT_OFFER, payload);
            return context.success(TypesActions.NOTIFY_SEND_OFFER, `Success send offer to ${destinationId}`);
        }

        context.badRequest(TypesActions.NOTIFY_SEND_OFFER, "You are not connected to conference");
    }

    sendAnswer(context: ActionContext<AnswerPayload>) {
        const { roomId, destinationId, answer } = context.Payload;

        const conferenceId = `${roomId}/conference`;

        if (context.Client.has(conferenceId)) {
            const payload = { sourceId: context.Client.SocketId, answer };
            io.to(destinationId).emit(TypesActions.ACCEPT_ANSWER, payload);
            return context.success(TypesActions.NOTIFY_SEND_ANSWER, `Success send answer to ${destinationId}`);
        }

        context.badRequest(TypesActions.NOTIFY_SEND_ANSWER, "You are not connected to conference");
    }

    sendIceCandidate(context: ActionContext<IceCandidatePayload>) {
        const { roomId, destinationId, iceCandidate } = context.Payload;

        const conferenceId = `${roomId}/conference`;

        if (context.Client.has(conferenceId)) {
            const payload = { sourceId: context.Client.SocketId, iceCandidate };
            io.to(destinationId).emit(TypesActions.ACCEPT_ICE_CANDIDATE, payload);
            return context.success(TypesActions.NOTIFY_SEND_ICE_CANDIDATE, `Success send ice candidate to ${destinationId}`);
        }

        context.badRequest(TypesActions.NOTIFY_SEND_ICE_CANDIDATE, "You are not connected to conference");
    }
}

export default new ConferenceActions();