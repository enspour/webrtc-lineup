import React from "react";

import useInitializeServices from "@hooks/useInitializeServices";
import useLoaderTheme from "@hooks/loaders/useLoaderTheme";

import "@assets/fonts/stylesheet.css";
import "@styles/reset.scss";
import "@styles/base.scss";
import "@styles/helpers.scss"; 
import "@styles/loader.scss";

import "@styles/themes/dark.scss";
import "@styles/themes/light.scss";

function MyApp({ Component, pageProps }) {
    useInitializeServices();
    useLoaderTheme();

    return <Component {...pageProps} />
}

export default MyApp;
