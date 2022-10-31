import React from "react";
import { useRouter } from "next/router";

import Svg from "@components/ui/Svg/Svg";
import Panel from "@components/ui/Panel/Panel";

import services from "@services";

import MenuLeftIcon from "@assets/images/conference-panel/menu-left.svg";
import MenuRightIcon from "@assets/images/conference-panel/menu-right.svg";
import FullIcon from "@assets/images/conference-panel/full.svg";
import MicrophoneIcon from "@assets/images/conference-panel/mic.svg";
import CameraIcon from "@assets/images/conference-panel/cam.svg";
import LeaveIcon from "@assets/images/conference-panel/leave.svg";

import styles from "./ConferencePanel.module.scss"

const ConferencePanel = () => {
    const router = useRouter();

    const leave = async () => {
        const response = await services.conference.leave();
        console.log(response);
        router.push("/room");
    }

    return (
        <Panel>
            <div className={styles.conference__panel}>
                <div className="fl al-center g-3">
                    <div className={styles.conference__panel__menu}>
                        <Svg url={MenuLeftIcon} width="1.8" height="1.5"/>
                        <Svg url={MenuRightIcon} width="1.8" height="1.5"/>
                    </div>

                    <div className={styles.conference__panel__full}>
                        <Svg url={FullIcon} width="1.4" height="1.4"/>
                    </div>

                    <div className={styles.conference__panel__title}>
                        Conference
                    </div>
                </div>

                <div className="fl al-center g-8">
                    <div className={styles.conference__panel__controls}>
                        <Svg url={CameraIcon} width="2.2" height="1.3"/>
                        <Svg url={MicrophoneIcon} width="1.4" height="1.9"/>
                    </div>

                    <div className={styles.conference__panel__leave} onClick={leave}>
                        <Svg url={LeaveIcon} width="2.4" height=".9" color="var(--theme-color-secondary)"/>
                        <span>
                            Leave
                        </span>
                    </div>
                </div>
            </div>
        </Panel>
    )
}

export default React.memo(ConferencePanel);