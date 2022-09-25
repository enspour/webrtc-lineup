export default class UserService {
    #store;

    constructor(store) {
        this.#store = store;
    }

    set User(user) {
        if (user && user.name && user.email && user.id) {
            this.#store.setUser(user);
        }
    }

    get Name() {
        return this.#store.name;
    }

    get Email() {
        return this.#store.email;
    }

    get Id() {
        return this.#store.id;
    }
}