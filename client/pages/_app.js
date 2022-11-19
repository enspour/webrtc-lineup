import useLoaderServices from "@hooks/loaders/useLoaderServices";
import useLoaderTheme from "@hooks/loaders/useLoaderTheme";
import useLoaderStore from "@hooks/loaders/useLoaderStore";
import useLoaderUser from "@hooks/loaders/useLoaderUser";

import MainLayout from "@components/layouts/MainLayout/MainLayout";

import "@assets/fonts/stylesheet.css";
import "@styles/reset.scss";
import "@styles/base.scss";
import "@styles/helpers.scss"; 
import "@styles/loader.scss";

import "@styles/themes/light.scss";
import "@styles/themes/dark.scss";

function MyApp({ Component, pageProps }) {
    useLoaderServices();
    useLoaderTheme();
    useLoaderStore();
    useLoaderUser();

    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    )
}

export default MyApp;
