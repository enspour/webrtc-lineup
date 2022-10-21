import RoomStore from "@store/Room.store";
import Signal from "./SignalService/Signal.service";

const States = {
    IDLE: "idle",
    PENDING: "pending",
    JOINED: "joined",
}

export default class RoomConnection {
    #signal;
    #roomstore;

    #state;

    constructor() {
        this.#signal = new Signal();
        this.#roomstore = new RoomStore();

        this.#state = States.IDLE;

        this.initialize();
    }

    initialize() {
        this.#signal.onJoinRoom((status, _, data) => {
            if (status === 200) {
                this.#state = States.JOINED;
                this.#roomstore.setRoom(data);
                return;
            }

            this.#state = States.IDLE;
        })

        this.#signal.onLeaveRoom((status) => {
            if (status === 200) {
                this.#state = States.IDLE;
            }
        })
    }

    async join(id, password) {
        let waiter;

        if (this.#state === States.IDLE) {
            this.#state = States.PENDING;

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

    async leave(id) {
        let waiter;

        if (this.#state === States.JOINED) {
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
}