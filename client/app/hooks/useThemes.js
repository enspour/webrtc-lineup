import React from "react";

import useLocalStorage from "./useLocalStorage";

import services from "@services";

const useThemes = () => {
    const [storageTheme, setStorageTheme] = useLocalStorage("__theme", {});

    React.useEffect(() => {
        services.themes.setTheme(storageTheme.theme);
    }, [storageTheme]);

    return [storageTheme, setStorageTheme, services.themes.all()];
}

export default useThemes;