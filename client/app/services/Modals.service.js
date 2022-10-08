import ModalsStore from "@store/Modals.store";

export default class Modals {
    #modalsStore;

    constructor() {
        this.#modalsStore = new ModalsStore();
    }

    get IsOpenAddRoom() {
        return this.#modalsStore.isOpenAddRoom;
    }

    set IsOpenAddRoom(value) {
        return this.#modalsStore.setIsOpenAddRoom(value);
    }
}