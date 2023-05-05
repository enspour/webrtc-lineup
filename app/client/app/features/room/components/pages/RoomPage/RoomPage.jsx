import { useEffect, memo } from "react";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";
import Conferences from "../../ui/Conferences/Conferences";
import ToolKits from "../../ui/ToolKits/ToolKits";

import services from "@services";

import styles from "./RoomPage.module.scss";

const RoomPage = () => {
    useEffect(() => {
        services.modals.browseRoom.close();
    }, []);

    return (
        <RoomLayout>
            <div className={styles.sections}>
                <div className={styles.section}>
                    <div className={styles.section__title}> Conferences </div>
                    <Conferences />
                </div>
                
                <div className={styles.section}>
                    <div className={styles.section__title}> Toolkit </div>
                    <ToolKits />
                </div>
            </div>
        </RoomLayout>
    );
}

export default memo(RoomPage);