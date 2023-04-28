import { action, makeAutoObservable, observable } from "mobx";

export default class ArrayStore {
    array = [];

    constructor() {
        makeAutoObservable(this, {
            array: observable,
            set: action,
            append: action,
            appendMany: action,
            remove: action,
            clear: action
        })
    }

    /**
     * 
     * @param {(item, index, array) => bool} compare 
     */
    has(compare) {
        const index = this.array.findIndex(compare);
        if (index !== -1) {
            return true;
        }
        return false;
    }

    append(item) {
        this.array.push(item);
    }

    appendMany(items) {
        this.array.push(...items);
    }

    remove(index) {
        if (0 <= index && index <= this.array.length - 1) {
            const item = this.array[index];

            this.array = this.array.filter((_, idx) => idx !== index);

            return item;
        }

        return null;
    }

    clear() {
        this.array = [];
    }
}