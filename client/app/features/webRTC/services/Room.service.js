export default class RoomService {
    #signal;
    #roomstore;

    constructor(signal, roomstore) {
        this.#signal = signal;
        this.#roomstore = roomstore;
    }

    initialize() {
        this.#signal.onJoinRoom((status, message, data) => console.log(status, message, data))
        this.#signal.onLeaveRoom((status, message, data) => console.log(status, message, data))
        this.#signal.onUserJoinRoom((socketId) => console.log("user connected to room", socketId))
        this.#signal.onUserLeaveRoom((socketId) => console.log("user leaved from room", socketId))
        this.#signal.onConnectionError((err) => console.log("unknow error", err));
        this.#signal.onDisconnect((reason) => console.log("disconnecting, reason:", reason))

        const offJoinRoom = this.#onJoinRoom();

        return () => {
            offJoinRoom();
        }
    }

    get Name() {
        return this.#roomstore.name;
    }

    async join(id, password) {
        let waiter;

        if (!this.#signal.Active) {
            const clear = this.#signal.onJoinRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            this.#signal.connect();
            this.#signal.join(id, password);

            return new Promise((resolve, _) => waiter = resolve);
        }
        
        return new Error("You are connecting");
    }

    async leave() {
        let waiter;

        if (this.#signal.Active) {
            const clear = this.#signal.onLeaveRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            const id = this.#roomstore.id;
            this.#signal.leave(id);

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


    #onJoinRoom() {
        return this.#signal.onJoinRoom((status, _, data) => {
            if (status === 200) {
                if (data) this.#roomstore.setRoom(data);
                return;
            }

            this.#signal.disconnect();
        });
    }
}