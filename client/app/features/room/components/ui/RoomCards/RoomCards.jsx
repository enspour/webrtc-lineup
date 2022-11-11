import React from "react";
import { useRouter } from "next/router";

import Panel from "@components/ui/Panel/Panel";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import services from "@services";

import styles from "./RoomCards.module.scss";

const Card = ({ title, hint, onClick, children }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <Panel minHeight="10rem" height="100%" width="30rem">
                <div className={styles.card__wrapper}>
                    <div>
                        <div className={styles.card__title}>{title}</div>
                        <div className={styles.card__hint}>{hint}</div>
                    </div>

                    <div>
                        {children}
                    </div>
                </div>
            </Panel>
        </div>
    )
}

const ConferenceCard = () => {
    const router = useRouter();

    const [enableMicrophone, setEnableMicrophone] = React.useState(true);
    const [enableCamera, setEnableCamera] = React.useState(false);

    const openConference = async () => {
        const constraints = { audio: enableMicrophone, video: enableCamera };
        const response = await services.conference.join(constraints);
        console.log(response);

        if (response.status === 200) {
            router.push("/room/conference");
        }
    }

    return (
        <Card 
            title="Conference" 
            hint="You can connect to conference here." 
            onClick={openConference}
        >
            <div className={styles.card__voicevideo}>
                <CheckBox
                    label="Microphone"
                    value={enableMicrophone} 
                    setValue={setEnableMicrophone}
                />
                
                <CheckBox
                    label="Camera" 
                    value={enableCamera} 
                    setValue={setEnableCamera}
                />
            </div>
        </Card>
    )
}

const RoomCards = () => {
    const router = useRouter();

    const openSettings = () => router.push("/room/settings");

    return (
        <div className={styles.cards}>
            <ConferenceCard />
            <Card title="Settings" hint="You can customize the room here." onClick={openSettings}/>
        </div>
    )
}

export default React.memo(RoomCards);