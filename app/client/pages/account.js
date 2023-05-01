import React from "react";

import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";
import Panel from "@components/ui/Panel/Panel";

import Themes from "@components/screens/account/Themes/Themes";
import Profile from "@components/screens/account/Profile/Profile";

import styles from "@styles/pages/account.module.scss";

const Account = () => {
    return (
        <LobbyLayout title="Lineup | Account">
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 6rem - 10rem)">
                    <div className={styles.wrapper}>
                        <Profile />
                        <Themes />
                    </div>
                </Panel>
            </div>
        </LobbyLayout>
    )
};

export default React.memo(Account);