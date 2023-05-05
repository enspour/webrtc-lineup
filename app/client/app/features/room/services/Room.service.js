import RoomStore from "../stores/Room.store";

import RoomInfoService from "./RoomInfo.service";
import RoomSignalService from "./RoomSignal.service";
import RoomConferencesService from "./RoomConferences.service";
import RoomLoggerService from "./RoomLogger.service";

export default class RoomService {
    #roomStore;
    #roomInfo;
    #roomSignal;
    #roomConferences;
    #roomLogger;

    constructor(_, socket) {
        this.#roomStore = new RoomStore();

        this.#roomSignal = new RoomSignalService(socket);
        this.#roomInfo = new RoomInfoService(this.#roomStore, this.#roomSignal);
        this.#roomConferences = new RoomConferencesService(this.#roomStore, this.#roomSignal);
        
        this.#roomLogger = new RoomLoggerService(this.#roomSignal);
    }

    initialize() {
        const roomSignalDestroyer = this.#roomSignal.initialize();
        const roomInfoDestroyer = this.#roomInfo.initialize();
        const roomConferencesDestroyer = this.#roomConferences.initialize();

        const roomLoggerDestroyer = this.#roomLogger.initialize();

        const offJoinRoom = this.#onJoinRoom();

        return () => {
            roomSignalDestroyer();
            roomInfoDestroyer();
            roomConferencesDestroyer();

            roomLoggerDestroyer();

            offJoinRoom();
        }
    }

    get Connected() {
        return this.#roomSignal.Connected;
    }

    get Info() {
        return this.#roomInfo;
    }

    get Conferences() {
        return this.#roomConferences;
    }

    async join(id, password) {
        let waiter;

        if (!this.#roomSignal.Active) {
            const clear = this.#roomSignal.onJoinRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            this.#roomSignal.connect();
            this.#roomSignal.join(id, password);

            return new Promise((resolve, _) => waiter = resolve);
        }
        
        return new Error("You are connecting");
    }

    async leave() {
        let waiter;

        if (this.#roomSignal.Active) {
            const clear = this.#roomSignal.onLeaveRoom((status, message, data) => {
                if (waiter) {
                    waiter({ status, message, data });
                }

                clear();
            })

            this.#roomSignal.leave(this.Info.Id);

            return new Promise((resolve, _) => waiter = resolve);
        }

        return new Error("You are not connected yet");
    }

    #onJoinRoom() {
        return this.#roomSignal.onJoinRoom((status) => {
            if (status !== 200) {
                this.#roomSignal.disconnect();
            }
        });
    }
}