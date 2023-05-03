import SidebarStore from "../stores/Sidebar.store";

export default class SidebarService {
    #sidebarStore;

    constructor() {
        this.#sidebarStore = new SidebarStore();
    }

    initialize() {
        return () => {}
    }

    get IsOpen() {
        return this.#sidebarStore.isOpen;
    }

    get Type() {
        return this.#sidebarStore.type;
    }

    setType(type) {
        this.#sidebarStore.setType(type);
    }

    open() {
        this.#sidebarStore.setIsOpen(true);
    }

    close() {
        this.#sidebarStore.setIsOpen(false);
    }
}