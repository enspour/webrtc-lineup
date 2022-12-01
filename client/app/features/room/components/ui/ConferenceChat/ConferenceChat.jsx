import React from "react";

import Panel from "@components/ui/Panel/Panel";

import styles from "./ConferenceChat.module.scss";

const ConferenceChat = () => {
    return (
        <div className={styles.chat__container}>
            <Panel height="calc(100vh - 5rem - 4rem)">
                <div className={styles.chat__wrapper}>
                    impliment chat
                </div>
            </Panel>
        </div>
    )
}

export default React.memo(ConferenceChat);