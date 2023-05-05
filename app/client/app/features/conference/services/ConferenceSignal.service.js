import SignalService from "@services/Signal.service";

const SignalActions = {
    JOIN_CONFERENCE: "conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:conference:join",

    LEAVE_CONFERENCE: "conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:conference:leave",

    NOTIFY_CONFERENCE_USER_JOINED: "notify:conference:user_joined",
    NOTIFY_CONFERENCE_USER_LEFT: "notify:conference:user_left",

    NOTIFY_CONFERENCE_INFO_UPDATED: "notify:conference:info_updated",

    SEND_MESSAGE_CONFERENCE_CHAT: "conference:chat:send_message",
    NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT: "notify:conference:chat:send_message",
    NOTIFY_CONFERENCE_CHAT_NEW_MESSAGE: "notify:conference:chat:new_message",
}

export default class ConferenceSignalService extends SignalService {
    #socket;

    constructor(socket) {
        super(socket);
        this.#socket = socket;
    }

    initialize() {
        const signalDestroyer = super.initialize();

        return () => {
            signalDestroyer();
        };
    }

    joinConference(roomId, conferenceId) {
        this.#socket.emit(SignalActions.JOIN_CONFERENCE, { roomId, conferenceId });
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onJoinConference(handler) {
        const event = async({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_JOIN_CONFERENCE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_JOIN_CONFERENCE, event);
    }

    leaveConference(id) {
        this.#socket.emit(SignalActions.LEAVE_CONFERENCE, { id });
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onLeaveConference(handler) {
        const event = async({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_LEAVE_CONFERENCE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_LEAVE_CONFERENCE, event);
    }

    /**
     * @param {(socketId: string, userId: string) => Promise<void>} handler 
     * @returns 
     */
    onConferenceUserJoined(handler) {
        const event = async ({ socketId, userId }) => await handler(socketId, userId);
        this.#socket.on(SignalActions.NOTIFY_CONFERENCE_USER_JOINED, event);
        return () => this.#socket.off(SignalActions.NOTIFY_CONFERENCE_USER_JOINED, event);
    }

    /**
     * @param {(socketId: string, userId: string) => Promise<void>} handler 
     * @returns 
     */
    onConferenceUserLeft(handler) {
        const event = async ({ socketId, userId }) => await handler(socketId, userId);
        this.#socket.on(SignalActions.NOTIFY_CONFERENCE_USER_LEFT, event);
        return () => this.#socket.off(SignalActions.NOTIFY_CONFERENCE_USER_LEFT, event);
    }

    /**
     * @param {(conference) => Promise<void>} handler 
     * @returns 
     */
    onConferenceInfoUpdated(handler) {
        const event = async ({ conference }) => await handler(conference);
        this.#socket.on(SignalActions.NOTIFY_CONFERENCE_INFO_UPDATED, event);
        return () => this.#socket.off(SignalActions.NOTIFY_CONFERENCE_INFO_UPDATED, event);
    }

    /**
     * @param {string} conferenceId
     * @param {string} tempId
     * @param {string} text
     * @returns
     */
    sendMessageConferenceChat(conferenceId, tempId, text) {
        this.#socket.emit(SignalActions.SEND_MESSAGE_CONFERENCE_CHAT, { conferenceId, tempId, text })
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns
     */
    onSendMessageConferenceChat(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT, event);
        return () => this.#socket.off(SignalActions.NOTIFY_SEND_MESSAGE_CONFERENCE_CHAT, event);
    }

    /**
     * @param {(message) => Promise<void>} handler 
     * @returns
     */
    onConferenceChatNewMessage(handler) {
        const event = async ({ message }) => await handler(message);
        this.#socket.on(SignalActions.NOTIFY_CONFERENCE_CHAT_NEW_MESSAGE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_CONFERENCE_CHAT_NEW_MESSAGE, event);
    }
}