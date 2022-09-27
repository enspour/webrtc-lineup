import React from "react";

import services from "@services";

const useLoaderTheme = () => {
    React.useEffect(() => {
        const theme = services.localStorage.get("__theme");

        if (theme) {
            services.themes.set(theme);
        } else {
            const theme = services.themes.default();
            services.themes.set(theme);
        }
    }, []); 
}

export default useLoaderTheme;