import { makeAutoObservable, runInAction } from "mobx"

import services from "@services";

export default class UserRoomsStore {
    rooms = [];
    state = "pending"; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this);
    }

    async update() {
        this.rooms = [];
        this.state = "pending";

        const request = services.API.createRequest(services.roomAPI.getCreated);
        await request.start({});

        const { response } = request;
        
        if (response.status === 200) {
            runInAction(() => {
                this.rooms = response.data.body.rooms;
                this.state = "done"
            })
        } else {
            runInAction(() => {
                this.state = "error"
            })
        }
    }

    clear() {
        this.rooms = [];
        this.state = "done"
    }
}