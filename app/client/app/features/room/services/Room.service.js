import RoomStore from "../stores/Room.store";
import RoomInfoService from "./RoomInfo.service";
import RoomSignalService from "./RoomSignal.service";
import RoomConferencesService from "./RoomConferences.service";
import RoomLoggerService from "./RoomLogger.service";

export default class RoomService {
    #store;
    #roomInfo;
    #roomSignal;
    #roomConferences;
    #roomLogger;

    constructor(_, socket) {
        this.#store = new RoomStore();
        this.#roomSignal = new RoomSignalService(socket);
        this.#roomInfo = new RoomInfoService(this.#store, this.#roomSignal);
        this.#roomConferences = new RoomConferencesService(this.#store, this.#roomSignal);
        this.#roomLogger = new RoomLoggerService(this.#roomSignal);
    }

    initialize() {
        const RoomInfoDestroyer = this.#roomInfo.initialize();
        const RoomConferencesDestroyer = this.#roomConferences.initialize();
        const RoomLoggerDestroyer = this.#roomLogger.initialize();

        const offJoinRoom = this.#onJoinRoom();

        return () => {
            RoomInfoDestroyer();
            RoomConferencesDestroyer();
            RoomLoggerDestroyer();

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