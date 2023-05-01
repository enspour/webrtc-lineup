import transformToRoom from "../utils/transformToRoom";

export default class RoomInfoService {
    #roomStore;
    #roomSignal;

    constructor(roomStore, roomSignal) {
        this.#roomStore = roomStore;
        this.#roomSignal = roomSignal;
    }

    initialize() {
        const offJoinRoom = this.#onJoinRoom();
        const offUpdateRoomInfo = this.#onUpdateRoomInfo();
        
        return () => {
            offJoinRoom();
            offUpdateRoomInfo();
        }
    }

    get Id() {
        return this.#roomStore.id;
    }

    get Name() {
        return this.#roomStore.name;
    }

    get Owner() {
        return this.#roomStore.owner;
    }

    get Settings() {
        return this.#roomStore.settings;
    }

    get Tags() {
        return this.#roomStore.tags;
    }

    get CreatedAt() {
        return this.#roomStore.createdAt;
    }

    #onJoinRoom() {
        return this.#roomSignal.onJoinRoom((status, _, data) => {
            if (status === 200 && data) {
                const room = transformToRoom(data)
                this.#roomStore.setRoom(room);
            }
        });
    }

    #onUpdateRoomInfo() {
        return this.#roomSignal.onRoomInformationUpdate((data) => {
            const room = transformToRoom(data);
            this.#roomStore.setRoom(room);
        });
    }
}