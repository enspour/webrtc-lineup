import { action, makeAutoObservable, observable } from "mobx";

export default class RequestedArrayStore {
    array = [];

    constructor() {
        makeAutoObservable(this, {
            array: observable,
            setArray: action,
            clear: action,
        });
    }

    setArray(array) {
        this.array = array;
    }

    clear() {
        this.array = [];
    }
}