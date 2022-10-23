import Signal from "./SignalService/Signal.service";

import RoomStore from "@store/Room.store";

export default class RoomConnection {
    #signal;
    #roomstore;

    constructor() {
        this.#signal = new Signal();
        this.#roomstore = new RoomStore();

        this.initialize();
    }

    initialize() {
        this.#signal.onJoinRoom((status, _, data) => {
            if (status === 200) {
                this.#roomstore.setRoom(data);
            } 
        })
    }

    get Name() {
        return this.#roomstore.name;
    }

    async join(id, password) {
        let waiter;

        if (!this.#signal.Connected) {
            this.#signal.connect();
            this.#signal.join(id, password);

            const clear = this.#signal.onJoinRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            return new Promise((resolve, _) => waiter = resolve);
        }
        
        return new Error("You are connecting");
    }

    async leave() {
        let waiter;

        if (this.#signal.Connected) {
            const id = this.#roomstore.id;
            this.#signal.leave(id);

            const clear = this.#signal.onLeaveRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            return new Promise((resolve, _) => waiter = resolve);
        }

        return new Error("You are not connected yet");
    }

    async getUsers() {
        const id = this.#roomstore.id;
        
        return new Promise((resolve, _) => {
            this.#signal.onceUsers((status, message, data) => {
                resolve({ status, message, data });
            })
            
            this.#signal.getUsers(id)
        });
    }
}