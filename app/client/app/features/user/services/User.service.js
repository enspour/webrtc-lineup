import UserDevicesService from "./UserDevices.service";
import UserInfoService from "./UserInfo.service";
import UserMediaService from "./UserMedia.service";
import UserSettingsService from "./UserSettings.service";

import UserStore from "../store/User.store";

export default class UserService {
    #userStore;
    #userInfo;
    #userDevices;
    #userMedia;
    #userSettings;

    constructor({ localStorage }) {
        this.#userStore = new UserStore();
        this.#userInfo = new UserInfoService(this.#userStore);
        this.#userDevices = new UserDevicesService();
        this.#userMedia = new UserMediaService(this.#userDevices, localStorage);
        this.#userSettings = new UserSettingsService(localStorage);
    }

    initialize() {
        const userInfoDestroyer = this.#userInfo.initialize();
        const userDevicesDestroyer = this.#userDevices.initialize();
        const userMediaDestroyer = this.#userMedia.initialize();
        const userSettingsDestroyer = this.#userSettings.initialize();

        return () => {
            userInfoDestroyer();
            userDevicesDestroyer();
            userMediaDestroyer();
            userSettingsDestroyer();
        }
    }

    get Info() {
        return this.#userInfo;
    }

    get Devices() {
        return this.#userDevices;
    }

    get Media() {
        return this.#userMedia;
    }

    get Settings() {
        return this.#userSettings;
    }
}