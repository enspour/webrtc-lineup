import React from "react";

import MainLayout from "@components/layouts/MainLayout/MainLayout";
import Panel from "@components/ui/Panel/Panel";

import VideoAudioScreen from "@components/screens/settings/VideoAudioScreen/VideoAudioScreen";

import styles from "@styles/pages/settings.module.scss";

const Settings = () => {
    return (
        <MainLayout>
            <div className={styles.container}>
                <Panel>
                    <div className={styles.wrapper}>
                        <VideoAudioScreen />
                    </div>
                </Panel>
            </div>
        </MainLayout>
    )
}

export default React.memo(Settings);