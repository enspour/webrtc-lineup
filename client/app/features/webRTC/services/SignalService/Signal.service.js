import { io, Socket } from "socket.io-client"

import SignalActions from "./Signal.actions";

export default class Signal {
    #socket;

    constructor() {
        this.#socket = io({ 
            path: "/api/v1/signal-service/socket/socket.io", 
            autoConnect: false
        });
    }

    get socketId() {
        return this.#socket.id;
    }

    get Connected() {
        return this.#socket.connected;
    }

    connect() {
        this.#socket.connect();
    }

    join(id, password) {
        this.#socket.emit(SignalActions.JOIN_ROOM, { id, password })
    }

    leave(id) {
        this.#socket.emit(SignalActions.LEAVE_ROOM, { id })
    }

    getUsers(id) {
        this.#socket.emit(SignalActions.GET_USERS, { id });
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
     * @param {(err: Error) => Promise<void>} handler 
     * @returns 
     */
    onConnectionError(handler) {
        this.#socket.on("connect_error", handler);
        return () => this.#socket.off("connect_error", handler)
    }

    /**
     * @param {(
     *      reason: Socket.DisconnectReason, 
     *      description: Socket.DisconnectDescription
     * ) => Promise<void>} handler 
     * @returns 
     */
    onDisconnect(handler) {
        this.#socket.on("disconnect", handler);
        return () => this.#socket.off("disconnect", handler);
    }


    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
     onceUsers(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.once(SignalActions.NOTIFY_GET_USERS, event);
    }
}