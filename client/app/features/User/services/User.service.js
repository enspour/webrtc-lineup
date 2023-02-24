import API from "@api/API";
import AuthAPI from "@api/AuthAPI";

import UserStore from "../store/User.store";

export default class UserService {
    #request;
    #userStore;

    constructor() {
        this.#request = API.createRequest(AuthAPI.me);
        this.#userStore = new UserStore();
    }

    initialize() {
        const offResponse = this.#onResponse();

        this.update();

        return () => {
            offResponse();
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

    async update() {
        await this.#request.start({});
    }

    #onResponse() {
        return this.#request.onResponse(response => {
            if (response && response.status === 200) {
                const user = response.data.body.user;
                this.#userStore.setUser(user);
            }
        });
    }

    toObject() {
        return {
            id: this.Id,
            name: this.Name
        }
    }
}