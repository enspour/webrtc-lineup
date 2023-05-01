import ThemesService from "./Themes.service";

export default class UserSettingsService {
    #themes;

    constructor(localStorage) {
        this.#themes = new ThemesService(localStorage);
    }

    initialize() {
        const themeDestroyer = this.#themes.initialize();
        
        return () => {
            themeDestroyer();
        }
    }

    get Themes() {
        return this.#themes;
    }
}