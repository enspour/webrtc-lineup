import Panel from "@components/ui/Panel/Panel";
import React from "react";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import styles from "./RoomSettingsPage.module.scss";

const Settings = () => (
    <RoomLayout title="Lineup | Settings">
        <div className={styles.settings}>
            <Panel>
                <div className={styles.wrapper}>
                    <div className={styles.settings__title}>
                        Settings
                    </div>
                </div>
            </Panel>
        </div>
    </RoomLayout>
);

export default React.memo(Settings);