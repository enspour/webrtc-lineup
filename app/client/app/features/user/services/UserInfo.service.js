import API from "@api/API";
import AuthAPI from "@api/AuthAPI";

export default class UserInfoService {
    #userStore;

    #request;

    constructor(userStore) {
        this.#userStore = userStore;
        
        this.#request = API.createRequest(AuthAPI.me);
    }

    initialize() {
        const offResponse = this.#onResponse();

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