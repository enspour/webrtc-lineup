import { action, makeAutoObservable, observable } from "mobx";

export default class ModalsStore {
    isOpenAddRoom;

    constructor() {
        makeAutoObservable(this, {
            isOpenAddRoom: observable,
            setIsOpenAddRoom: action,
        });
    }

    setIsOpenAddRoom(value) {
        this.isOpenAddRoom = value;
    }
}