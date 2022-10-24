import { Socket } from "socket.io";

import RoomsService from "./Rooms.service";

import parseId from "@utils/parseId";

class Client {
    constructor(private socket: Socket, private rooms: RoomsService) {}

    async join(roomId: string) {
        await this.socket.join(roomId);

        const userId = parseId(this.socket.request);
        this.rooms.addClient(roomId, { socketId: this.socket.id, userId });
    }

    disconnect() {
        this.socket.disconnect();
    }

    has(roomId: string) {
        return this.socket.rooms.has(roomId);
    }
}

export default class ClientService {
    constructor(private rooms: RoomsService) {}

    createClient(socket: Socket) {
        return new Client(socket, this.rooms);
    }
}