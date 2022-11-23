import { Client } from "@socket/stores/clients.store";
import RoomsStore from "@socket/stores/rooms.store";

import removeDuplicates from "core/utils/removeDuplicates";

export default class RoomsService {
    private rooms; 

    constructor() {
        this.rooms = new RoomsStore();
    }

    addClient(roomId: string, client: Client) {
        this.rooms.appendClient(roomId, client);
    }

    removeClient(roomId: string, socketId: string) {
        this.rooms.removeClient(roomId, socketId);
    }

    getClients(roomId: string) {
        return this.rooms.getClients(roomId).map(item => ({ userId: item.userId, socketId: item.socketId }));
    }

    getUsersIds(roomId: string) {
        const usersIds = this.rooms.getClients(roomId).map(item => item.userId);
        return removeDuplicates(usersIds);
    }
}