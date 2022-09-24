import React from "react";

import Content from "./Content/Content";
import Header from "./Header/Header";

import useRequest from "@hooks/useRequest";
import useResponse from "@hooks/useResponse";

import services from "@services";

import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
    const request = useRequest(services.authAPI.me);
    const { data } = useResponse(request);
    
    React.useEffect(() => {
        request.start();
    }, [])

    React.useEffect(() => {
        if (data) {
            services.user.User = data.body.user
        }
    }, [data])

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