import ContextMenuStore from "@stores/ContextMenu.store";

export default class ContextMenuService {
    #store;

    constructor() {
        this.#store = new ContextMenuStore();
    }

    get Menu() {
        return this.#store.menu;
    }

    get Coordinates() {
        return this.#store.coordinates;
    }

    get IsOpen() {
        return this.#store.isOpen;
    }

    setMenu(menu) {
        this.#store.setMenu(menu);
    }

    setCoordinates(coordinates) {
        this.#store.setCoordinates(coordinates);
    }

    setIsOpen(isOpen) {
        this.#store.setIsOpen(isOpen);
    }
}