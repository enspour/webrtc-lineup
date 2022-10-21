import { Socket } from "socket.io";

import stores from "@socket/stores";

import parseId from "@utils/parseId";

export default class SocketsService {
    join(socket: Socket, roomId: string) {
        socket.join(roomId);
        
        const userId = parseId(socket.request);
        stores.rooms.addClient(roomId, { socketId: socket.id, userId });
    }

    remove(socket: Socket, roomId: string) {
        stores.rooms.removeClient(roomId, socket.id);
    }
}