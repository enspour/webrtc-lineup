import useServices from "@hooks/useServices";

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
    useServices();

    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    )
}

export default MyApp;
