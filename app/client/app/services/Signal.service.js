export default class SignalService {
    #socket;

    constructor(socket) {
        this.#socket = socket;
    }

    initialize() {
        return () => {};
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
}