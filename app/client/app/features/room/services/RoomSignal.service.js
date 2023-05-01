import SignalService from "@services/Signal.service";

const SignalActions = {
    JOIN_ROOM: "room:join",
    NOTIFY_JOIN: "notify:room:join",

    LEAVE_ROOM: "room:leave",
    NOTIFY_LEAVE: "notify:room:leave",

    NOTIFY_USER_LEAVE: "notify:room:user_leave",
    NOTIFY_USER_JOIN: "notify:room:user_join",

    NOTIFY_UPDATE_ROOM_INFORMATION: "notify:room:info_update",
    NOTIFY_UPDATE_CONFERENCE_INFORMATION: "notify:conference:info_update",
}

export default class RoomSignalService extends SignalService {
    #socket;

    constructor(socket) {
        super(socket);
        this.#socket = socket;
    }

    join(id, password) {
        this.#socket.emit(SignalActions.JOIN_ROOM, { id, password })
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onJoinRoom(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_JOIN, event);
        return () => this.#socket.off(SignalActions.NOTIFY_JOIN, event);
    }

    leave(id) {
        this.#socket.emit(SignalActions.LEAVE_ROOM, { id })
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onLeaveRoom(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_LEAVE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_LEAVE, event);
    }

    /**
     * @param {(socketId: string) => Promise<void>} handler 
     * @returns 
     */
    onUserLeaveRoom(handler) {
        const event = async ({ socketId }) => await handler(socketId);
        this.#socket.on(SignalActions.NOTIFY_USER_LEAVE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_USER_LEAVE, event);
    }

    /**
     * @param {(socketId: string) => Promise<void>} handler 
     * @returns 
     */
    onUserJoinRoom(handler) {
        const event = async ({ socketId }) => await handler(socketId);
        this.#socket.on(SignalActions.NOTIFY_USER_JOIN, event);
        return () => this.#socket.off(SignalActions.NOTIFY_USER_JOIN, event);
    }

    /**
     * @param {(room) => Promise<void>} handler 
     * @returns 
     */
    onRoomInformationUpdate(handler) {
        const event = async ({ room }) => await handler(room);
        this.#socket.on(SignalActions.NOTIFY_UPDATE_ROOM_INFORMATION, event);
        return () => this.#socket.off(SignalActions.NOTIFY_UPDATE_ROOM_INFORMATION, event);
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
}