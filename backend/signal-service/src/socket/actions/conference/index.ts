import { Socket } from "socket.io";

import { ConferenceActionsTypes } from "@socket/types";
import ConferenceActions from "./conference.actions";

import { idValidator } from "../validators/id.validator";
import { joinValidator } from "./validators/join.validator";
import { offerValidator } from "./validators/offer.validator";
import { answerValidator } from "./validators/answer.validator";
import { iceCandidateValidator } from "./validators/iceCandidate.validator";

import services from "@socket/services";

const joinValidation = {
    validate: joinValidator,
    action: ConferenceActionsTypes.NOTIFY_JOIN_CONFERENCE
};

const leaveValidation = {
    validate: idValidator,
    action: ConferenceActionsTypes.NOTIFY_LEAVE_CONFERENCE,
};

const sendOfferValidation = {
    validate: offerValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_OFFER
};

const sendAnswerValidation = {
    validate: answerValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_ANSWER
};

const sendIceCandidateValidation = {
    validate: iceCandidateValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_ICE_CANDIDATE
};

const initConferenceActions = (socket: Socket) => {
    socket.on(
        ConferenceActionsTypes.JOIN_CONFERENCE,
        services.actions.create(socket, ConferenceActions.join, joinValidation)
    );

    socket.on(
        ConferenceActionsTypes.LEAVE_CONFERENCE,
        services.actions.create(socket, ConferenceActions.leave, leaveValidation)
    );

    socket.on(
        ConferenceActionsTypes.SEND_OFFER,
        services.actions.create(socket, ConferenceActions.sendOffer, sendOfferValidation)
    );

    socket.on(
        ConferenceActionsTypes.SEND_ANSWER,
        services.actions.create(socket, ConferenceActions.sendAnswer, sendAnswerValidation)
    );

    socket.on(
        ConferenceActionsTypes.SEND_ICE_CANDIDATE,
        services.actions.create(socket, ConferenceActions.sendIceCandidate, sendIceCandidateValidation)
    );
}

export default initConferenceActions;