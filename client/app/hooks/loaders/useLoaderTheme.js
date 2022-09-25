import React from "react";

import services from "@services";

const DEFAULT_THEME_ID = 1;

const useLoaderTheme = () => {
    React.useEffect(() => {
        let theme = services.localStorage.get("__theme");

        if (!theme) {
            theme = services.themes.getTheme(DEFAULT_THEME_ID);
        } 

        services.themes.setTheme(theme.theme);
    }, []); 
}

export default useLoaderTheme;