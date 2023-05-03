import { action, makeAutoObservable, observable } from "mobx";

export default class SidebarStore {
    isOpen = false;
    type = "empty";
    
    constructor() {
        makeAutoObservable(this, {
            isOpen: observable,
            type: observable,
            setIsOpen: action,
            setType: action,
        });
    }

    setIsOpen(isOpen) {
        this.isOpen = isOpen;
    }

    setType(type) {
        this.type = type;
    }
}