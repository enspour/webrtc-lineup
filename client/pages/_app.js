import React from "react";

import useInitializeServices from "@hooks/useInitializeServices";
import useLoaderTheme from "@hooks/loaders/useLoaderTheme";

import "@assets/fonts/stylesheet.css";
import "@styles/reset.scss";
import "@styles/base.scss";
import "@styles/helpers.scss"; 

function MyApp({ Component, pageProps }) {
    useInitializeServices();
    useLoaderTheme();

    return <Component {...pageProps} />
}

export default MyApp;
