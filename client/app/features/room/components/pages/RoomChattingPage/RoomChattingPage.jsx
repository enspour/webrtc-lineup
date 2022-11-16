import React from "react";
import { useRouter } from "next/router";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import styles from "./RoomChattingPage.module.scss";

const Chatting = () => {
    const router = useRouter();

    const back = () => router.back();

    return (
        <RoomLayout title="Lineup | Chatting">
            <div className={styles.container}>
                <Panel height="calc(100vh - 5rem - 4rem)">
                    <PanelHeader title="Chatting" onClick={back}/>

                    <div className={styles.wrapper}>
                        impliment chatting
                    </div>
                </Panel>
            </div>
        </RoomLayout>
    )
}

export default React.memo(Chatting);