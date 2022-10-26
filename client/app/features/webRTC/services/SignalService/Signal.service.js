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

    get SocketId() {
        return this.#socket.id;
    }

    get Active() {
        return this.#socket.active;
    }

    get Connected() {
        return this.#socket.connected;
    }

    connect() {
        this.#socket.connect();
    }

    disconnect() {
        this.#socket.disconnect();
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



    // ----- ROOM -----

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

    getUsers(id) {
        this.#socket.emit(SignalActions.GET_USERS, { id });
    }

    /**
     * @param {(status: number, message: string, data: any) => Promise<void>} handler 
     * @returns 
     */
     onceUsers(handler) {
        const event = async ({ status, message, data }) => await handler(status, message, data);
        this.#socket.once(SignalActions.NOTIFY_GET_USERS, event);
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



    // ----- CONFERENCE -----

    joinConference(id) {
        this.#socket.emit(SignalActions.JOIN_CONFERENCE, { id });
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
     * @param {(socketId: string) => Promise<void>} handler 
     * @returns 
     */
     onUserJoinConference(handler) {
        const event = async ({ socketId }) => await handler(socketId);
        this.#socket.on(SignalActions.NOTIFY_USER_JOIN_CONFERENCE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_USER_JOIN_CONFERENCE, event);
    }

    /**
     * @param {(socketId: string) => Promise<void>} handler 
     * @returns 
     */
     onUserLeaveConference(handler) {
        const event = async ({ socketId }) => await handler(socketId);
        this.#socket.on(SignalActions.NOTIFY_USER_LEAVE_CONFERENCE, event);
        return () => this.#socket.off(SignalActions.NOTIFY_USER_LEAVE_CONFERENCE, event);
    }

    sendOffer(roomId, destinationId, offer) {
        const payload = { roomId, destinationId, offer };
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
     * @param {(sourceId: string, offer) => Promise<void>} handler 
     * @returns
     */
    onAcceptOffer(handler) {
        const event = async ({ sourceId, offer }) => await handler(sourceId, offer);
        this.#socket.on(SignalActions.ACCEPT_OFFER, event);
        return () => this.#socket.off(SignalActions.ACCEPT_OFFER, event);
    }

    sendAnswer(roomId, destinationId, answer) {
        const payload = { roomId, destinationId, answer };
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
     * @param {(sourceId: string, answer) => Promise<void>} handler 
     * @returns
     */
    onAcceptAnswer(handler) {
        const event = async ({ sourceId, answer }) => await handler(sourceId, answer);
        this.#socket.on(SignalActions.ACCEPT_ANSWER, event);
        return () => this.#socket.off(SignalActions.ACCEPT_ANSWER, event);
    }

    sendIceCandidate(roomId, destinationId, iceCandidate) {
        const payload = { roomId, destinationId, iceCandidate };
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
     * @param {(sourceId: string, iceCandidate) => Promise<void>} handler 
     * @returns
     */
    onAcceptIceCandidate(handler) {
        const event = async ({ sourceId, iceCandidate }) => await handler(sourceId, iceCandidate);
        this.#socket.on(SignalActions.ACCEPT_ICE_CANDIDATE, event);
        return () => this.#socket.off(SignalActions.ACCEPT_ICE_CANDIDATE, event);
    }
}