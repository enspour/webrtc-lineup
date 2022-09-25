import React from "react";

import Content from "./Content/Content";
import Header from "./Header/Header";

import useLoaderUser from "@hooks/loaders/useLoaderUser";

import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
    useLoaderUser();

    return (
        <main className={styles.main}>
            <Header />
            <Content>
                {children}
            </Content>
        </main>
    )
}

export default MainLayout;