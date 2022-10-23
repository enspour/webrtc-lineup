import React from "react";

import Panel from "@components/ui/Panel/Panel";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import styles from "./CardsScreen.module.scss";

const ConferenceCard = () => {
    const [enableMicrophone, setEnableMicrophone] = React.useState(true);
    const [enableCamera, setEnableCamera] = React.useState(false);

    return (
        <div className={styles.card}>
            <Panel>
                <div className={styles.card__wrapper}>
                    <div>
                        <div className={styles.card__title}> Conference </div>
                        <div className={styles.card__hint}> Click to connect to conference </div>
                    </div>
                    
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
                </div>
            </Panel>
        </div>
    )
}

const CardsScreen = () => {
    return (
        <div className={styles.cards}>
            <ConferenceCard />
        </div>
    )
}

export default React.memo(CardsScreen);