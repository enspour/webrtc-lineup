import UserStore from "@store/User.store";

export default class UserService {
    #userStore;

    constructor(api, authAPI) {
        const request = api.createRequest(authAPI.me);
        this.#userStore = new UserStore(request);
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

    async update() {
        await this.#userStore.update();
    }
}