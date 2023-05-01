import { Socket } from "socket.io";

import { MediaPeersConnectionActionsTypes } from "@socket/types";
import MediaPeersConnectionActions from "./mediaPeersConnection";

import { offerValidator } from "./validators/offer.validator";
import { answerValidator } from "./validators/answer.validator";
import { iceCandidateValidator } from "./validators/iceCandidate.validator";

import services from "@socket/services";

const sendOfferValidation = {
    validate: offerValidator,
    action: MediaPeersConnectionActionsTypes.NOTIFY_SEND_OFFER
};

const sendAnswerValidation = {
    validate: answerValidator,
    action: MediaPeersConnectionActionsTypes.NOTIFY_SEND_ANSWER
};

const sendIceCandidateValidation = {
    validate: iceCandidateValidator,
    action: MediaPeersConnectionActionsTypes.NOTIFY_SEND_ICE_CANDIDATE
};

const initMediaPeersConnectionActions = (socket: Socket) => {
    socket.on(
        MediaPeersConnectionActionsTypes.SEND_OFFER,
        services.actions.create(socket, MediaPeersConnectionActions.sendOffer, sendOfferValidation)
    );

    socket.on(
        MediaPeersConnectionActionsTypes.SEND_ANSWER,
        services.actions.create(socket, MediaPeersConnectionActions.sendAnswer, sendAnswerValidation)
    );

    socket.on(
        MediaPeersConnectionActionsTypes.SEND_ICE_CANDIDATE,
        services.actions.create(socket, MediaPeersConnectionActions.sendIceCandidate, sendIceCandidateValidation)
    );
}

export default initMediaPeersConnectionActions;