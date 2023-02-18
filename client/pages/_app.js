import useLoaderServices from "@hooks/loaders/useLoaderServices";
import useLoaderUserStores from "@hooks/loaders/useLoaderUserStores";

import MainLayout from "@components/layouts/MainLayout/MainLayout";

import "@assets/fonts/stylesheet.css";
import "@styles/reset.scss";
import "@styles/base.scss";
import "@styles/helpers.scss"; 
import "@styles/loader.scss";
import "@styles/scroll.scss";

import "@styles/themes/light.scss";
import "@styles/themes/dark.scss";

function MyApp({ Component, pageProps }) {
    useLoaderServices();
    useLoaderUserStores();

    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    )
}

export default MyApp;
