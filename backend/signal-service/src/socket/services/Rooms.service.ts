import { Client } from "@socket/stores/clients.store";
import RoomsStore from "@socket/stores/rooms.store";

export default class RoomsService {
    private rooms; 

    constructor() {
        this.rooms = new RoomsStore();
    }

    addClient(roomId: string, client: Client) {
        this.rooms.addClient(roomId, client)
    }

    removeClient(roomId: string, socketId: string) {
        this.rooms.removeClient(roomId, socketId);
    }

    getClients(roomId: string) {
        return this.rooms.getClients(roomId).map(item => ({ userId: item.userId, socketId: item.socketId }));
    }
}