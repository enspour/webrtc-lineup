import SocketRouter from "@socket/utils/SocketRouter";

import MediaPeersConnectionActions from "./mediaPeersConnection";
import ActionsTypes from "./actions.types";

import { offerValidator } from "./validators/offer.validator";
import { answerValidator } from "./validators/answer.validator";
import { iceCandidateValidator } from "./validators/iceCandidate.validator";

const sendOfferValidation = {
    validate: offerValidator,
    action: ActionsTypes.NOTIFY_SEND_OFFER
};

const sendAnswerValidation = {
    validate: answerValidator,
    action: ActionsTypes.NOTIFY_SEND_ANSWER
};

const sendIceCandidateValidation = {
    validate: iceCandidateValidator,
    action: ActionsTypes.NOTIFY_SEND_ICE_CANDIDATE
};

const initMediaPeersConnectionActions = (router: SocketRouter) => {
    router.register(
        ActionsTypes.SEND_OFFER,
        MediaPeersConnectionActions.sendOffer,
        sendOfferValidation
    );

    router.register(
        ActionsTypes.SEND_ANSWER,
        MediaPeersConnectionActions.sendAnswer, 
        sendAnswerValidation
    );

    router.register(
        ActionsTypes.SEND_ICE_CANDIDATE,
        MediaPeersConnectionActions.sendIceCandidate,
        sendIceCandidateValidation
    );
}

export default initMediaPeersConnectionActions;