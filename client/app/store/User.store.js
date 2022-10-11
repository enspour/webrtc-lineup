import { makeAutoObservable, observable, runInAction } from "mobx";

export default class UserStore {
    id = "";
    name = "";
    email = "";
    
    constructor(request) {
        this.request = request;

        makeAutoObservable(this, {
            id: observable,
            name: observable,
            email: observable,
        });

        this.request.onResponse(response => {
            if (response && response.status === 200) {
                const user = response.data.body.user;

                runInAction(() => {
                    this.id = user.id;
                    this.name = user.name;
                    this.email = user.email;
                });
            }
        });
    } 

    async update() {
        await this.request.start({});
    }
}