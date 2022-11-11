import React from "react";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import styles from "./RoomChattingPage.module.scss";

const Chatting = () => {
    return (
        <RoomLayout title="Lineup | Chatting">
            <div className={styles.chatting}>
                <Panel>
                    <PanelHeader title="Chatting"/>

                    <div className={styles.wrapper}>
                        impliment chatting
                    </div>
                </Panel>
            </div>
        </RoomLayout>
    )
}

export default React.memo(Chatting);