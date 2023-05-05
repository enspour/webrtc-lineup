import UserStore from "../store/User.store";

import UserDevicesService from "./UserDevices.service";
import UserInfoService from "./UserInfo.service";
import UserMediaService from "./UserMedia.service";
import UserSettingsService from "./UserSettings.service";
import UserCreatedRoomsService from "./UserCreatedRooms.service";
import UserFavoritesRoomsService from "./UserFavoritesRooms.service";

export default class UserService {
    #userStore;
    
    #userInfo;
    #userDevices;
    #userMedia;
    #userSettings;
    #userCreatedRooms;
    #userFavoritesRooms;

    constructor({ localStorage }) {
        this.#userStore = new UserStore();

        this.#userInfo = new UserInfoService(this.#userStore);
        this.#userDevices = new UserDevicesService();
        this.#userMedia = new UserMediaService(this.#userDevices, localStorage);
        this.#userSettings = new UserSettingsService(localStorage);
        this.#userCreatedRooms = new UserCreatedRoomsService();
        this.#userFavoritesRooms = new UserFavoritesRoomsService();
    }

    initialize() {
        const userInfoDestroyer = this.#userInfo.initialize();
        const userDevicesDestroyer = this.#userDevices.initialize();
        const userMediaDestroyer = this.#userMedia.initialize();
        const userSettingsDestroyer = this.#userSettings.initialize();
        const userCreatedRoomsDestroyer = this.#userCreatedRooms.initialize();
        const userFavoriteRoomsDestroyer = this.#userFavoritesRooms.initialize();

        return () => {
            userInfoDestroyer();
            userDevicesDestroyer();
            userMediaDestroyer();
            userSettingsDestroyer();
            userCreatedRoomsDestroyer();
            userFavoriteRoomsDestroyer();
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

    get CreatedRooms() {
        return this.#userCreatedRooms;
    }

    get FavoritesRooms() {
        return this.#userFavoritesRooms;
    }
}