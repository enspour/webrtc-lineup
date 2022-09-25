import light from "@assets/themes/light.json";
import dark from "@assets/themes/dark.json";

const themes = [
    { id: 1, name: "light", theme: light },
    { id: 2, name: "dark", theme: dark }
];

export default class ThemesService {
    initialize() {
        this.html = document.querySelector("html");
    }

    getTheme(id) {
        const theme = themes.find(item => item.id === id);

        if (theme) {
            return theme;
        } 

        return null;
    }

    setTheme(theme) {
        for (let property in theme) {
            this.html.style.setProperty(property, theme[property]);
        }
    } 

    all() {
        return themes;
    }
}