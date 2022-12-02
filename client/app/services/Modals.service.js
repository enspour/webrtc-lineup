import ModalStore from "@stores/Modal.store";

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
    #room;

    constructor() {
        super();

        this.#room = {}
    } 

    get Room() {
        return this.#room;
    }

    setRoom(room) {
        this.#room = room;
    }
}

class ConferenceModal extends Modal {
    #conference;

    constructor() {
        super();

        this.#conference = {};
    }

    get Conference() {
        return this.#conference;
    }

    setConference(conference) {
        this.#conference = conference
    }
}

export default class ModalsService {
    constructor() {
        this.createRoom = new Modal();
        this.browseRoom = new RoomModal();
        this.browseRoomSettings = new Modal();

        this.createConference = new Modal();
        this.browseConferenceSettings = new ConferenceModal();
    }
}