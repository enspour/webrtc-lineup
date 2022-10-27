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
        this.peers.push(peer);
    }

    remove(peerId) {
        this.peers = this.peers.filter(item => item.remotePeerId !== peerId);
    }

    clear() {
        this.peers = [];
    }
}