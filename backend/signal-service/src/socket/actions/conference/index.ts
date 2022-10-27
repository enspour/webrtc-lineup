import { Socket } from "socket.io";

import TypesActions from "./types.actions";
import ConferenceActions from "./conference.actions";

import { idValidator } from "../validators/id.validator";
import { offerValidator } from "./validators/offer.validator";
import { answerValidator } from "./validators/answer.validator";
import { iceCandidateValidator } from "./validators/iceCandidate.validator";

import services from "@socket/services";

const joinValidator = {
    validate: idValidator,
    action: TypesActions.NOTIFY_JOIN_CONFERENCE
};

const leaveValidator = {
    validate: idValidator,
    action: TypesActions.NOTIFY_LEAVE_CONFERENCE,
};

const sendOfferValidator = {
    validate: offerValidator,
    action: TypesActions.NOTIFY_SEND_OFFER
};

const sendAnswerValidator = {
    validate: answerValidator,
    action: TypesActions.NOTIFY_SEND_ANSWER
};

const sendIceCandidateValidator = {
    validate: iceCandidateValidator,
    action: TypesActions.NOTIFY_SEND_ICE_CANDIDATE
};

const initConferenceActions = (socket: Socket) => {
    socket.on(
        TypesActions.JOIN_CONFERENCE,
        services.actions.create(socket, ConferenceActions.join, joinValidator)
    );

    socket.on(
        TypesActions.LEAVE_CONFERENCE,
        services.actions.create(socket, ConferenceActions.leave, leaveValidator)
    );

    socket.on(
        TypesActions.SEND_OFFER,
        services.actions.create(socket, ConferenceActions.sendOffer, sendOfferValidator)
    );

    socket.on(
        TypesActions.SEND_ANSWER,
        services.actions.create(socket, ConferenceActions.sendAnswer, sendAnswerValidator)
    );

    socket.on(
        TypesActions.SEND_ICE_CANDIDATE,
        services.actions.create(socket, ConferenceActions.sendIceCandidate, sendIceCandidateValidator)
    );
}

export default initConferenceActions;