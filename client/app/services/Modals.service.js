import ModalStore from "@stores/Modal.store";

import { RoomStore } from "@features/room";

class Modal {
    #store;

    constructor() {
        this.#store = new ModalStore();
    }

    get IsOpen() {
        return this.#store.isOpenModal;
    }

    setIsOpen(value) {
        return this.#store.setIsOpenModal(value);
    }
}

class RoomModal extends Modal {
    #roomStore;

    constructor() {
        super();
        this.#roomStore = new RoomStore();
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

    get Tags() {
        return this.#roomStore.tags;
    }

    get CreatedAt() {
        return this.#roomStore.createdAt;
    }

    setRoom(room) {
        this.#roomStore.setRoom(room);
    }
}

export default class ModalsService {
    constructor() {
        this.createRoom = new Modal();
        this.createConference = new Modal();
        this.room = new RoomModal(); 
    } 
}