import { Socket } from "socket.io";

import services from "@socket/services";

import decodeAccessTokenByRequest from "@utils/decodeAccessTokenByRequest";

class UserChannels {
    constructor(private socket: Socket, private id: string) {}

    get Count() {
        return this.socket.rooms.size;
    }

    async join(id: string, type: "room" | "conference") {
        await this.socket.join(id);

        const peer = {
            socketId: this.socket.id,
            userId: this.id
        }

        services.channels.join(id, type, peer);
    }

    async leave(id: string) {
        await this.socket.leave(id);
        services.channels.leave(id, this.socket.id);
    }

    has(id: string) {
        return this.socket.rooms.has(id);
    }
}

export default class User {
    private id;
    private name;
    private channels;

    constructor(
        private socket: Socket
    ) {
        const { user } =  decodeAccessTokenByRequest(socket.request);

        this.id = user.id;
        this.name = user.name;
        this.channels = new UserChannels(socket, this.id);
    }

    get Id() {
        return this.id;
    }

    get Name() {
        return this.name;
    }

    get SocketId() {
        return this.socket.id;
    }

    get Channels() {
        return this.channels;
    }

    disconnect() {
        this.socket.disconnect();
    }
}