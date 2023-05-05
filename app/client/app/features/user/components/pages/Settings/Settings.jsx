import { memo } from "react";

import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";
import Panel from "@components/ui/Panel/Panel";

import VideoAudio from "../../screens/settings/VideoAudio/VideoAudio";

import styles from "./Settings.module.scss";

const Settings = () => {
    return (
        <LobbyLayout>
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 6rem - 10rem)">
                    <div className={styles.wrapper}>
                        <VideoAudio />
                    </div>
                </Panel>
            </div>
        </LobbyLayout>
    )
}

export default memo(Settings);