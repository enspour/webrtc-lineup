import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import Svg from "@components/ui/Svg/Svg";
import Panel from "@components/ui/Panel/Panel";

import services from "@services";

import MenuLeftIcon from "@assets/images/conference-panel/menu-left.svg";
import MenuRightIcon from "@assets/images/conference-panel/menu-right.svg";
import FullIcon from "@assets/images/conference-panel/full.svg";
import MicrophoneIcon from "@assets/images/conference-panel/mic.svg";
import MicrophoneOffIcon from "@assets/images/conference-panel/mic-off.svg";
import CameraIcon from "@assets/images/conference-panel/cam.svg";
import CameraOffIcon from "@assets/images/conference-panel/cam-off.svg";
import LeaveIcon from "@assets/images/conference-panel/leave.svg";

import styles from "./ConferencePanel.module.scss"

const CameraControl = observer(() => {
    const isMuteVideo = services.userMedia.IsMuteVideo;

    const mute = () => services.userMedia.muteVideo();
    const unmute = () => services.userMedia.unmuteVideo();

    return (
        <div>
            {
                isMuteVideo
                    ? <Svg url={CameraOffIcon} width="2.2" height="2.1" onClick={unmute}/>
                    : <Svg url={CameraIcon} width="2.2" height="1.3" onClick={mute}/>
            }
        </div>
    );
});

const MicrophoneControl = observer(() => {
    const isMuteAudio = services.userMedia.IsMuteAudio;

    const mute = () => services.userMedia.muteAudio();
    const unmute = () => services.userMedia.unmuteAudio();

    return (
        <div className={styles.conference__panel__controls__mic}>
            {
                isMuteAudio 
                    ? <Svg url={MicrophoneOffIcon} width="1.8" height="1.9" onClick={unmute}/>
                    : <Svg url={MicrophoneIcon} width="1.4" height="1.9" onClick={mute}/>
            }
        </div>
    );
});

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
                        <CameraControl />
                        <MicrophoneControl />
                    </div>

                    <div className={styles.conference__panel__leave} onClick={leave}>
                        <Svg url={LeaveIcon} width="2.4" height=".9" color="var(--theme-color-secondary)"/>
                        <span> Leave </span>
                    </div>
                </div>
            </div>
        </Panel>
    )
}

export default React.memo(ConferencePanel);