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

    get User() {
        return this.#store.user;
    }
}