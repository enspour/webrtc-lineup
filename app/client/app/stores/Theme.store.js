import { makeAutoObservable, observable, action } from "mobx";

export default class ThemeStore {
    theme = {};

    constructor() {
        makeAutoObservable(this, {
            theme: observable,
            set: action
        });
    }

    set(theme) {
        this.theme = theme;
    }
}