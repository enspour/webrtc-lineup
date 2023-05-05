import { nanoid } from "nanoid";

import ArrayStore from "@stores/Array.store";

export default class NotificationService {
    #notifications;

    constructor() {
        this.#notifications = new ArrayStore();
    }

    initialize() {
        return () => {};
    }

    get Notifications() {
        return this.#notifications.array;
    }

    notify(message) {
        this.#notifications.append({
            id: nanoid(10),
            message
        })
    }

    close(id) {
        const index = this.Notifications.findIndex(item => item.id === id);

        if (index !== -1) { 
            this.#notifications.remove(index)
        }
    }
}