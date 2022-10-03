import { action, makeAutoObservable, observable } from "mobx"

export default class UserStore {
    id = "";
    name = "";
    email = "";
    
    constructor() {
        makeAutoObservable(this, {
            id: observable,
            name: observable,
            email: observable,
            setUser: action, 
        })
    }

    setUser(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}