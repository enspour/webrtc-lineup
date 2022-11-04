import { action, makeAutoObservable, observable } from "mobx";

export default class PeersStore {
    peers = [];

    constructor() {
        makeAutoObservable(this, {
            peers: observable,
            add: action,
            remove: action,
            clear: action
        })
    }

    add(peer) {
        if (peer) {
            this.peers.push(peer);
        }
    }

    remove(peerId) {
        const index = this.peers.findIndex(item => item.PeerId === peerId);
        if (index !== -1) {
            const peer = this.peers[index];

            this.peers = this.peers.filter((_, idx) => idx !== index);

            return peer;
        }

        return null;
    }

    clear() {
        this.peers = [];
    }
}