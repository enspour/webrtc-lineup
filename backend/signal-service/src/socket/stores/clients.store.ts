export interface Client {
    socketId: string
    userId: string
}

class Clients {
    private clients: Client[];

    constructor(...clients: Client[]) {
        this.clients = [...clients];
    }

    append(client: Client) {
        if (this.clients.findIndex(item => item.socketId === client.socketId) === -1) {
            this.clients.push(client);
        }
    }

    remove(socketId: string) {
        const index = this.clients.findIndex(item => item.socketId === socketId)
        if (index !== -1) {
            this.clients.splice(index, 1);
        }
    }

    get UsersIds() {
        return this.clients.map(item => item.userId);
    }

    get length() {
        return this.clients.length;
    }
}

export default Clients;