import React from "react";
import { observer } from "mobx-react-lite";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import ConferenceCard from "../../ui/ConferenceCard/ConferenceCard";

import services from "@services";

import styles from "./RoomPage.module.scss";

const Room = observer(() => {
    const conferences = services.room.ConferencesInfo.Array;

    return (
        <RoomLayout>
            <div className={styles.conferences}>
                <div className={styles.conferences__title}> Conferences </div>
                <div className={styles.conferences__items}>
                    { conferences.map(item => <ConferenceCard key={item.id} conference={item}/>) }
                </div>
            </div>
        </RoomLayout>
    )
});

export default Room;