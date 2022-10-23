import { Socket } from "socket.io";

import parseId from "@utils/parseId";
import RoomsStore from "@socket/stores/rooms.store";

export default class RoomsService {
    private rooms; 

    constructor() {
        this.rooms = new RoomsStore();
    }

    join(socket: Socket, roomId: string) {
        const userId = parseId(socket.request);
        this.rooms.addClient(roomId, { socketId: socket.id, userId });
    }

    remove(socket: Socket, roomId: string) {
        this.rooms.removeClient(roomId, socket.id);
    }

    getUsers(roomId: string) {
        return this.rooms.getClients(roomId).map(item => ({ userId: item.userId, socketId: item.socketId }));
    }
}