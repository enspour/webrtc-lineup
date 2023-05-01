import SignalService from "@services/Signal.service";

const SignalActions = {
    SEND_ICE_CANDIDATE: "room:conference:send_ice-candidate",
    NOTIFY_SEND_ICE_CANDIDATE: "notify:room:conference:send_ice-candidate",
    ACCEPT_ICE_CANDIDATE: "room:conference:accept_ice-candidate",

    SEND_OFFER: "room:conference:send_offer",
    NOTIFY_SEND_OFFER: "notify:room:conference:send_offer",
    ACCEPT_OFFER: "room:conference:accept_offer",

    SEND_ANSWER: "room:conference:send_answer",
    NOTIFY_SEND_ANSWER: "notify:room:conference:send_answer",
    ACCEPT_ANSWER: "room:conference:accept_answer",
}

export default class MediaPeersSignalService extends SignalService {
    #socket;

    constructor(socket) {
        super(socket);
        this.#socket = socket;
    }

    sendOffer(channelId, peerId, offer) {
        const payload = { conferenceId: channelId, destinationId: peerId, offer };
        this.#socket.emit(SignalActions.SEND_OFFER, payload);
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onSendOffer(handler) {
        const event = async({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_SEND_OFFER, event);
        return () => this.#socket.off(SignalActions.NOTIFY_SEND_OFFER, event);
    }

    /**
     * @param {(socketId: string, userId: string, offer) => Promise<void>} handler 
     * @returns
     */
    onAcceptOffer(handler) {
        const event = async ({ socketId, userId, offer }) => await handler(socketId, userId, offer);
        this.#socket.on(SignalActions.ACCEPT_OFFER, event);
        return () => this.#socket.off(SignalActions.ACCEPT_OFFER, event);
    }

    sendAnswer(channelId, peerId, answer) {
        const payload = { conferenceId: channelId, destinationId: peerId, answer };
        this.#socket.emit(SignalActions.SEND_ANSWER, payload);
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onSendAnswer(handler) {
        const event = async({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_SEND_ANSWER, event);
        return () => this.#socket.off(SignalActions.NOTIFY_SEND_ANSWER, event);
    }

    /**
     * @param {(socketId: string, userId: string, answer) => Promise<void>} handler 
     * @returns
     */
    onAcceptAnswer(handler) {
        const event = async ({ socketId, userId, answer }) => await handler(socketId, userId, answer);
        this.#socket.on(SignalActions.ACCEPT_ANSWER, event);
        return () => this.#socket.off(SignalActions.ACCEPT_ANSWER, event);
    }

    sendIceCandidate(channelId, peerId, iceCandidate) {
        const payload = { conferenceId: channelId, destinationId: peerId, iceCandidate };
        this.#socket.emit(SignalActions.SEND_ICE_CANDIDATE, payload);
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onSendIceCandidate(handler) {
        const event = async({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_SEND_ICE_CANDIDATE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_SEND_ICE_CANDIDATE, event);
    }

    /**
     * @param {(socketId: string, iceCandidate) => Promise<void>} handler 
     * @returns
     */
    onAcceptIceCandidate(handler) {
        const event = async ({ socketId, iceCandidate }) => await handler(socketId, iceCandidate);
        this.#socket.on(SignalActions.ACCEPT_ICE_CANDIDATE, event);
        return () => this.#socket.off(SignalActions.ACCEPT_ICE_CANDIDATE, event);
    }
}