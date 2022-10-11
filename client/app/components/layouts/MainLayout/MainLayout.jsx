import React from "react";
import Head from "next/head";

import Content from "./Content/Content";
import Header from "./Header/Header";

import styles from "./MainLayout.module.scss";

const MainLayout = ({ children, title = "Lineup" }) => {
    return (
        <main className={styles.main}>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />
            <Content>
                {children}
            </Content>
        </main>
    )
}

export default React.memo(MainLayout);