import { makeAutoObservable, runInAction } from "mobx"

export default class SearchStore {
    searchedText = "";
    rooms = [];
    state = "pending"; // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this);
    }

    setSearchedText(text) {
        this.searchedText = text;
    }

    async update(request) {
        this.rooms = [];
        this.state = "pending";

        await request.start({ params: { name: this.searchedText } });

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
        this.state = "done";
    }
}