import ClientsStore, { Client } from "./clients.store";

interface Room {
    id: string
    clients: ClientsStore
}

class RoomsStore {
    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    addClient(roomId: string, client: Client) {
        const index = this.rooms.findIndex(item => item.id === roomId)
        if (index === -1) {
            const room = { id: roomId, clients: new ClientsStore(client) }
            this.rooms.push(room)
        } else {
            const room = this.rooms[index];
            room.clients.append(client);
        }
    }

    removeClient(roomId: string, socketId: string) {
        const index = this.rooms.findIndex(item => item.id === roomId)

        if (index !== -1) {
            const room = this.rooms[index];
            room.clients.remove(socketId);

            if (room.clients.length === 0) {
                this.rooms.splice(index, 1);
            }
        }
    }

    getClients(roomId: string) {
        const index = this.rooms.findIndex(item => item.id === roomId)
        if (index !== -1) {
            return this.rooms[index].clients.Clients;
        }

        return [];
    }
}

export default RoomsStore;