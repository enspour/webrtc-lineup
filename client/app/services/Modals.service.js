import ModalStore from "@store/Modal.store";
import RoomStore from "@store/Room.store";

class Modal {
    #store;

    constructor() {
        this.#store = new ModalStore();
    }

    get IsOpen() {
        return this.#store.isOpenModal;
    }

    set IsOpen(value) {
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

    get Status() {
        return this.#roomStore.status;
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

    set Room(room) {
        this.#roomStore.setRoom(room);
    }
}

export default class Modals {
    constructor() {
        this.addRoom = new Modal();
        this.room = new RoomModal();    
    } 
}