import Head from "next/head";

import Content from "./Content/Content";
import Header from "./Header/Header";

import useLoaderUser from "@hooks/loaders/useLoaderUser";
import useLoaderStore from "@hooks/loaders/useLoaderStore";

import styles from "./MainLayout.module.scss";

const MainLayout = ({ children, title = "Lineup" }) => {
    useLoaderUser();
    useLoaderStore();

    return (
        <main className={styles.main}>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />
            <Content>
                {children}
            </Content>
        </main>
    )
}

export default MainLayout;