import { action, makeAutoObservable, observable, runInAction } from "mobx"

const handlerRooms = rooms => {
    return rooms.map(item => ({
        ...item,
        createdAt: item.created_at,
    }))
}

export default class RoomsStore {
    rooms = [];
    state = "pending"; // "pending", "done" or "error"

    constructor(request) {
        this.request = request;

        makeAutoObservable(this, {
            rooms: observable,
            state: observable,
            clear: action,
        });

        this.request.onStart(() => {
            runInAction(() => {
                this.rooms = [];
                this.state = "pending";
            })
        })

        this.request.onResponse(response => {
            if (response && response.status === 200) {
                runInAction(() => {
                    this.rooms = handlerRooms(response.data.body.rooms);
                    this.state = "done";
                })
            }
        })

        this.request.onError(error => {
            if (error) {
                runInAction(() => {
                    this.state = "error";
                })
            }
        });
    }

    async update(data) {
        await this.request.start(data);
    }

    clear() {
        this.rooms = [];
        this.state = "done"
    }
}