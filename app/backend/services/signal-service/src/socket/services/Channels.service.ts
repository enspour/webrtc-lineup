import { Peer, Peers } from "@socket/stores/Peers";

import removeDuplicates from "core/utils/removeDuplicates";

interface Channel {
    id: string
    type: "room" | "conference"
    peers: Peers
}

export default class ChannelService {
    private channels: Channel[];

    constructor() {
        this.channels = [];
    }

    join(id: string, type: "room" | "conference", peer: Peer) {
        const index = this.channels.findIndex(item => item.id === id);

        if (index === -1) {
            const channel: Channel = { 
                id,
                type,
                peers: new Peers(peer) 
            }
            
            this.channels.push(channel)
        } else {
            const channel = this.channels[index];
            channel.peers.append(peer);
        }
    }

    leave(id: string, socketId: string) {
        const index = this.channels.findIndex(item => item.id === id)

        if (index !== -1) {
            const channel = this.channels[index];
            channel.peers.remove(socketId);

            if (channel.peers.Count === 0) {
                this.channels.splice(index, 1);
            }
        }
    }

    getChannel(id: string): Channel | null {
        const index = this.channels.findIndex(item => item.id === id);

        if (index !== -1) {
            return this.channels[index];
        }

        return null;
    }

    getPeers(id: string): Peer[] {
        const index = this.channels.findIndex(item => item.id === id);

        if (index !== -1) {
            return this.channels[index].peers.Peers;
        }

        return [];
    }

    getUsersIds(id: string): string[] {
        const usersIds = this.getPeers(id).map(item => item.userId);
        return removeDuplicates(usersIds);
    }
}