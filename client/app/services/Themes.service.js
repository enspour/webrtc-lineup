const themes = [
    { id: 1, name: "light", primary: "#F8F8F8", tertiary: "#ECF6FF" },
    { id: 2, name: "dark", primary: "#474747", tertiary: "#656565"  }
]

export default class ThemesService {
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