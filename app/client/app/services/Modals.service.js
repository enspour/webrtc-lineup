import ModalStore from "@stores/Modal.store";

class Modal {
    #store;
    #data;

    constructor() {
        this.#store = new ModalStore();
        this.#data = {};
    }

    get IsOpen() {
        return this.#store.isOpenModal;
    }

    get Data() {
        return this.#data;
    }

    open() {
        this.#store.setIsOpenModal(true);
    }

    close() {
        this.#store.setIsOpenModal(false);
    }

    setData(data) {
        this.#data = data;
    }
}

export default class ModalsService {
    constructor() {
        this.createRoom = new Modal();
        this.browseRoom = new Modal();
        this.browseRoomSettings = new Modal();

        this.createConference = new Modal();
        this.browseConferenceSettings = new Modal();
    }

    initialize() {
        return () => {};
    }
}