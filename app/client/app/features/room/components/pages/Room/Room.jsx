import { useEffect, memo } from "react";

import Conferences from "../../screens/Conferences/Conferences";

import services from "@services";

import styles from "./Room.module.scss";

const Room = () => {
    useEffect(() => {
        services.modals.browseRoom.close();
    }, []);

    return (
        <div className={styles.sections}>
            <div className={styles.section}>
                <div className={styles.section__title}> Конференции </div>
                <Conferences />
            </div>
        </div>
    );
}

export default memo(Room);