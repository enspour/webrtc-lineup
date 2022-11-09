import React from "react";

import MainLayout from "@components/layouts/MainLayout/MainLayout";
import Panel from "@components/ui/Panel/Panel";

import ThemesScreen from "@components/screens/account/ThemesScreen/ThemesScreen";
import ProfileScreen from "@components/screens/account/ProfileScreen/ProfileScreen";

import styles from "@styles/pages/account.module.scss";

const Account = () => {
    return (
        <MainLayout title="Lineup | Account">
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 6rem - 10rem)">
                    <div className={styles.wrapper}>
                        <ProfileScreen />
                        <ThemesScreen />
                    </div>
                </Panel>
            </div>
        </MainLayout>
    )
};

export default React.memo(Account);