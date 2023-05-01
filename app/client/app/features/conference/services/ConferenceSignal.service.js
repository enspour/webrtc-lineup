import SignalService from "@services/Signal.service";

const SignalActions = {
    JOIN_CONFERENCE: "room:conference:join",
    NOTIFY_JOIN_CONFERENCE: "notify:room:conference:join",

    LEAVE_CONFERENCE: "room:conference:leave",
    NOTIFY_LEAVE_CONFERENCE: "notify:room:conference:leave",

    NOTIFY_USER_JOIN_CONFERENCE: "notify:room:conference:user_join",
    NOTIFY_USER_LEAVE_CONFERENCE: "notify:room:conference:user_leave",
    
    NOTIFY_UPDATE_CONFERENCE_INFORMATION: "notify:conference:info_update",

    SEND_MESSAGE: "chat:send:message",
    NOTIFY_SEND_MESSAGE: "notify:chat:send:message",
    NOTIFY_NEW_MESSAGE: "notify:chat:new:message",
}

export default class ConferenceSignalService extends SignalService {
    #socket;

    constructor(socket) {
        super(socket);
        this.#socket = socket;
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
    onUserJoinConference(handler) {
        const event = async ({ socketId, userId }) => await handler(socketId, userId);
        this.#socket.on(SignalActions.NOTIFY_USER_JOIN_CONFERENCE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_USER_JOIN_CONFERENCE, event);
    }

    /**
     * @param {(socketId: string, userId: string) => Promise<void>} handler 
     * @returns 
     */
    onUserLeaveConference(handler) {
        const event = async ({ socketId, userId }) => await handler(socketId, userId);
        this.#socket.on(SignalActions.NOTIFY_USER_LEAVE_CONFERENCE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_USER_LEAVE_CONFERENCE, event);
    }

    /**
     * @param {(conference) => Promise<void>} handler 
     * @returns 
     */
    onConferenceInformationUpdate(handler) {
        const event = async ({ conference }) => await handler(conference);
        this.#socket.on(SignalActions.NOTIFY_UPDATE_CONFERENCE_INFORMATION, event);
        return () => this.#socket.off(SignalActions.NOTIFY_UPDATE_CONFERENCE_INFORMATION, event);
    }

    /**
     * @param {string} conferenceId
     * @param {string} tempId
     * @param {string} text
     * @returns
     */
    sendMessage(conferenceId, tempId, text) {
        this.#socket.emit(SignalActions.SEND_MESSAGE, { conferenceId, tempId, text })
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns
     */
    onSendMessage(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_SEND_MESSAGE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_SEND_MESSAGE, event);
    }

    /**
     * @param {(message) => Promise<void>} handler 
     * @returns
     */
    onNewMessage(handler) {
        const event = async ({ message }) => await handler(message);
        this.#socket.on(SignalActions.NOTIFY_NEW_MESSAGE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_NEW_MESSAGE, event);
    }
}