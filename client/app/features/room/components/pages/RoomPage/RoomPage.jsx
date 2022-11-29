import React from "react";
import { observer } from "mobx-react-lite";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import ConferenceCard from "../../ui/ConferenceCard/ConferenceCard";
import ToolkitCard from "../../ui/ToolkitCard/ToolkitCard";

import services from "@services";

import styles from "./RoomPage.module.scss";

const Toolkits = () => {
    return (
        <div className={styles.section__items}>
            <ToolkitCard 
                title="File Storage" 
                hint="You can exchange files to conduct productive meetings here."
            />
        </div>
    );
}

const Conferences = observer(() => {
    const conferences = services.room.ConferencesInfo.Array;

    return (
        <div className={styles.section__items}>
            { conferences.map(item => <ConferenceCard key={item.id} conference={item}/>) }
        </div>
    )
});

const RoomPage = () => {
    return (
        <RoomLayout>
            <div className={styles.sections}>
                <div className={styles.section}>
                    <div className={styles.section__title}> Conversation </div>
                    <Conferences />
                </div>
                
                <div className={styles.section}>
                    <div className={styles.section__title}> Toolkit </div>
                    <Toolkits />
                </div>
            </div>
        </RoomLayout>
    )
}

export default React.memo(RoomPage);