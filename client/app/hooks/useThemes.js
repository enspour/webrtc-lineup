import useLocalStorage from "./useLocalStorage";

import services from "@services";

const useThemes = () => {
    const [storageTheme, setStorageTheme] = useLocalStorage("__theme", services.themes.default());

    const setTheme = (theme) => {
        services.themes.switch(storageTheme, theme);
        setStorageTheme(theme);
    }

    return [storageTheme, setTheme, services.themes.Themes];
}

export default useThemes;