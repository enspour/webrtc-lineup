export default class StorageService {
    initialize(type) {
        if (type === "local") {
            this.storage = window.localStorage;
        } else if (type === "session") {
            this.storage = window.sessionStorage;
        }

        return () => {}
    }

    get(key) {
        if (this.storage) {
            const value = this.storage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
        }

        return null;
    }

    set(key, value) {
        if (this.storage) {
            this.storage.setItem(key, JSON.stringify(value));
        }
    }

    remove(key) {
        if (this.storage) {
            this.storage.removeItem(key);
        }
    }

    clear() {
        if (this.storage) {
            this.storage.clear();
        }
    }
}