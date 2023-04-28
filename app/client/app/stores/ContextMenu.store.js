import { action, makeAutoObservable, observable } from "mobx";

export default class ContextMenuStore {
    menu = [];
    coordinates = {};
    isOpen = false;

    constructor() {
        makeAutoObservable(this, {
            menu: observable,
            coordinates: observable,
            isOpen: observable,

            setMenu: action,
            setCoordinates: action,
            setIsOpen: action,
        });
    }

    setMenu(menu) {
        this.menu = menu;
    }

    setCoordinates(coordinates) {
        this.coordinates = coordinates;
    }

    setIsOpen(isOpen) {
        this.isOpen = isOpen;
    }
}