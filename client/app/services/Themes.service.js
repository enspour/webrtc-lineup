import ThemeStore from "@stores/Theme.store";

const themes = [
    { id: 1, name: "light", primary: "#FFFFFF", secondary: "#526A7D" },
    { id: 2, name: "dark", primary: "#1f1f1f", secondary: "#606060" },
]

export default class ThemesService {
    #localStorage;
    #themeStore;

    constructor() {
        this.#themeStore = new ThemeStore();
    }

    initialize(localStorage) {
        this.#localStorage = localStorage;

        const theme = localStorage.get("__theme");

        if (theme) {
            this.set(theme);
        } else {
            this.set(themes[0]);
        }
    }

    get Themes() {
        return themes;
    }

    get Theme() {
        return this.#themeStore.theme;
    }

    set(theme) {
        if (this.#themeStore.theme) {
            document.body.classList.remove(this.#themeStore.theme.name);
        }

        document.body.classList.add(theme.name);
        
        this.#themeStore.set(theme);
        this.#localStorage.set("__theme", theme);
    }
}