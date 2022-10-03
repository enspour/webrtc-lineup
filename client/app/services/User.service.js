import UserStore from "@store/User.store";

export default class UserService {
    #userStore;

    constructor() {
        this.#userStore = new UserStore();
    }

    set User(user) {
        if (user && user.name && user.email && user.id) {
            this.#userStore.setUser(user);
        }
    }

    get Name() {
        return this.#userStore.name;
    }

    get Email() {
        return this.#userStore.email;
    }

    get Id() {
        return this.#userStore.id;
    }
}