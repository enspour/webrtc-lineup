import React from "react";

import Panel from "@components/ui/Panel/Panel";

import styles from "./RoomSettingsScreen.module.scss";

const RoomSettingsScreen = () => {
    return (
        <div className={styles.settings}>
            <Panel>
                <div className={styles.wrapper}>
                    <div className={styles.settings__title}>
                        Settings
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default React.memo(RoomSettingsScreen);