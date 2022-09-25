import React from "react";

import useLoaderTheme from "@hooks/loaders/useLoaderTheme";

import services from "@services";

import "@assets/fonts/stylesheet.css";
import "@styles/reset.scss";
import "@styles/base.scss";
// import "@styles/variables.scss";
import "@styles/helpers.scss";

function MyApp({ Component, pageProps }) {
    useLoaderTheme();

    React.useLayoutEffect(() => {
        services.initialize();
    }, []);

    return <Component {...pageProps} />
}

export default MyApp;
