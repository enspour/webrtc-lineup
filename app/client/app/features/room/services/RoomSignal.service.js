import SignalService from "@services/Signal.service";

const SignalActions = {
    ROOM_JOIN: "room:join",
    NOTIFY_ROOM_JOIN: "notify:room:join",

    ROOM_LEAVE: "room:leave",
    NOTIFY_ROOM_LEAVE: "notify:room:leave",

    NOTIFY_ROOM_USER_JOINED: "notify:room:user_joined",
    NOTIFY_ROOM_USER_LEFT: "notify:room:user_left",

    NOTIFY_ROOM_INFO_UPDATED: "notify:room:info_updated",
    NOTIFY_CONFERENCE_INFO_UPDATED: "notify:conference:info_updated",
}

export default class RoomSignalService extends SignalService {
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

    join(id, password) {
        this.#socket.emit(SignalActions.ROOM_JOIN, { id, password })
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onJoinRoom(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_ROOM_JOIN, event);
        return () => this.#socket.off(SignalActions.NOTIFY_ROOM_JOIN, event);
    }

    leave(id) {
        this.#socket.emit(SignalActions.ROOM_LEAVE, { id })
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
    onLeaveRoom(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.on(SignalActions.NOTIFY_ROOM_LEAVE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_ROOM_LEAVE, event);
    }

    /**
     * @param {(socketId: string) => Promise<void>} handler 
     * @returns 
     */
    onRoomUserJoined(handler) {
        const event = async ({ socketId }) => await handler(socketId);
        this.#socket.on(SignalActions.NOTIFY_ROOM_USER_JOINED, event);
        return () => this.#socket.off(SignalActions.NOTIFY_ROOM_USER_JOINED, event);
    }

    /**
     * @param {(socketId: string) => Promise<void>} handler 
     * @returns 
     */
    onRoomUserLeft(handler) {
        const event = async ({ socketId }) => await handler(socketId);
        this.#socket.on(SignalActions.NOTIFY_ROOM_USER_LEFT, event);
        return () => this.#socket.off(SignalActions.NOTIFY_ROOM_USER_LEFT, event);
    }

    /**
     * @param {(room) => Promise<void>} handler 
     * @returns 
     */
    onRoomInfoUpdated(handler) {
        const event = async ({ room }) => await handler(room);
        this.#socket.on(SignalActions.NOTIFY_ROOM_INFO_UPDATED, event);
        return () => this.#socket.off(SignalActions.NOTIFY_ROOM_INFO_UPDATED, event);
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
}