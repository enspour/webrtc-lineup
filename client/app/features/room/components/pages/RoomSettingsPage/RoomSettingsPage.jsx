import React from "react";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import styles from "./RoomSettingsPage.module.scss";

const Settings = () => {
    return (
        <RoomLayout title="Lineup | Settings">
            <div className={styles.settings}>
                <Panel>
                    <PanelHeader title="Settings"/>

                    <div className={styles.wrapper}>
                        impliment settings
                    </div>
                </Panel>
            </div>
        </RoomLayout>
    )
}

export default React.memo(Settings);