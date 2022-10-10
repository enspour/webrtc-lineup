import useLoaderServices from "@hooks/loaders/useLoaderServices";
import useLoaderTheme from "@hooks/loaders/useLoaderTheme";

import "@assets/fonts/stylesheet.css";
import "@styles/reset.scss";
import "@styles/base.scss";
import "@styles/helpers.scss"; 
import "@styles/loader.scss";

import "@styles/themes/light.scss";
import "@styles/themes/dark.scss";
import "@styles/themes/gray.scss";

function MyApp({ Component, pageProps }) {
    useLoaderServices();
    useLoaderTheme();

    return <Component {...pageProps} />
}

export default MyApp;
