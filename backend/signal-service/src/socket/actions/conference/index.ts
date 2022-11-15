import { Socket } from "socket.io";

import { ConferenceActionsTypes } from "@socket/types";
import ConferenceActions from "./conference.actions";

import { idValidator } from "../validators/id.validator";
import { offerValidator } from "./validators/offer.validator";
import { answerValidator } from "./validators/answer.validator";
import { iceCandidateValidator } from "./validators/iceCandidate.validator";

import services from "@socket/services";

const joinValidator = {
    validate: idValidator,
    action: ConferenceActionsTypes.NOTIFY_JOIN_CONFERENCE
};

const leaveValidator = {
    validate: idValidator,
    action: ConferenceActionsTypes.NOTIFY_LEAVE_CONFERENCE,
};

const sendOfferValidator = {
    validate: offerValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_OFFER
};

const sendAnswerValidator = {
    validate: answerValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_ANSWER
};

const sendIceCandidateValidator = {
    validate: iceCandidateValidator,
    action: ConferenceActionsTypes.NOTIFY_SEND_ICE_CANDIDATE
};

const initConferenceActions = (socket: Socket) => {
    socket.on(
        ConferenceActionsTypes.JOIN_CONFERENCE,
        services.actions.create(socket, ConferenceActions.join, joinValidator)
    );

    socket.on(
        ConferenceActionsTypes.LEAVE_CONFERENCE,
        services.actions.create(socket, ConferenceActions.leave, leaveValidator)
    );

    socket.on(
        ConferenceActionsTypes.SEND_OFFER,
        services.actions.create(socket, ConferenceActions.sendOffer, sendOfferValidator)
    );

    socket.on(
        ConferenceActionsTypes.SEND_ANSWER,
        services.actions.create(socket, ConferenceActions.sendAnswer, sendAnswerValidator)
    );

    socket.on(
        ConferenceActionsTypes.SEND_ICE_CANDIDATE,
        services.actions.create(socket, ConferenceActions.sendIceCandidate, sendIceCandidateValidator)
    );
}

export default initConferenceActions;