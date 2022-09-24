import { action, makeAutoObservable, observable } from "mobx"

export default class UserStore {
    user = {}
    
    constructor() {
        makeAutoObservable(this, {
            user: observable,
            setUser: action
        })
    }

    setUser(user) {
        this.user = user
    }
}