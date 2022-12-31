import React from "react";

import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";
import Panel from "@components/ui/Panel/Panel";

import VideoAudioScreen from "@components/screens/settings/VideoAudioScreen/VideoAudioScreen";

import styles from "@styles/pages/settings.module.scss";

const Settings = () => {
    return (
        <LobbyLayout>
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 6rem - 10rem)">
                    <div className={styles.wrapper}>
                        <VideoAudioScreen />
                    </div>
                </Panel>
            </div>
        </LobbyLayout>
    )
}

export default React.memo(Settings);