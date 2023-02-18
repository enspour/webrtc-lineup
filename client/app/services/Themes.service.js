const themes = [
    { id: 1, name: "light", primary: "#FFFFFF", secondary: "#526A7D" },
    { id: 2, name: "dark", primary: "#1f1f1f", secondary: "#606060" },
]

export default class ThemesService {
    initialize(localStorage) {
        const theme = localStorage.get("__theme");

        if (theme) {
            this.set(theme);
        } else {
            this.set(themes[0]);
        }
    }

    switch(oldTheme, newTheme) {
        document.body.classList.remove(oldTheme.name);
        document.body.classList.add(newTheme.name);
    } 

    set(theme) {
        document.body.classList.add(theme.name); 
    }

    default() {
        return themes[0];
    } 

    get Themes() {
        return themes;
    }
}