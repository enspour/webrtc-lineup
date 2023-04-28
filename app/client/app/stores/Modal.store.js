import { action, makeAutoObservable, observable } from "mobx";

export default class ModalStore {
    isOpenModal = false; 

    constructor() {
        makeAutoObservable(this, {
            isOpenModal: observable,
            setIsOpenModal: action, 
        });
    }

    setIsOpenModal(value) {
        this.isOpenModal = value;
    }
}