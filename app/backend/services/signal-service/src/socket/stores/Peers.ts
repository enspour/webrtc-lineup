export interface Peer {
    socketId: string
    userId: string
}

export class Peers {
    private peers: Peer[];

    constructor(...peers: Peer[]) {
        this.peers = [...peers];
    }

    append(peer: Peer) {
        const index = this.peers.findIndex(item => item.socketId === peer.socketId);
        
        if (index === -1) {
            this.peers.push(peer);
        }
    }

    remove(socketId: string) {
        const index = this.peers.findIndex(item => item.socketId === socketId);

        if (index !== -1) {
            this.peers.splice(index, 1);
        }
    }

    get Peers() {
        return this.peers;
    }

    get Count() {
        return this.peers.length;
    }
}