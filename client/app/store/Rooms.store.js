import { makeAutoObservable, runInAction } from "mobx"

export default class RoomsStore {
    rooms = [];
    state = "pending"; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this);
    }

    async update(request, data) {
        runInAction(() => {
            this.rooms = [];
            this.state = "pending";
        })

        await request.start(data);

        const { response } = request;

        if (response && response.status === 200) {
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