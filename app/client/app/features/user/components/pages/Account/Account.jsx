import { memo } from "react";

import Panel from "@components/ui/Panel/Panel";

import Themes from "../../screens/account/Themes/Themes";
import Profile from "../../screens/account/Profile/Profile";

import styles from "./Account.module.scss";

function Account() {
    return (
        <div className={styles.container}>
            <Panel maxHeight="calc(100vh - 6rem - 10rem)">
                <div className={styles.wrapper}>
                    <Profile />
                    <Themes />
                </div>
            </Panel>
        </div>
    )
};

export default memo(Account);