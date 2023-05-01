import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import Svg from "@components/ui/Svg/Svg";
import FilledButton from "@components/ui/FilledButton/FilledButton";

import services from "@services";

import MenuLeftIcon from "@assets/images/conference-header/menu-left.svg";
import MenuRightIcon from "@assets/images/conference-header/menu-right.svg";
import FullIcon from "@assets/images/conference-header/full.svg";
import MicrophoneIcon from "@assets/images/conference-header/mic.svg";
import MicrophoneOffIcon from "@assets/images/conference-header/mic-off.svg";
import CameraIcon from "@assets/images/conference-header/cam.svg";
import CameraOffIcon from "@assets/images/conference-header/cam-off.svg";
import LeaveIcon from "@assets/images/conference-header/leave.svg";

import styles from "./Header.module.scss"

const CameraControl = observer(() => {
    const settings = services.conference.Info.Settings;
    const mutedVideo = services.user.Media.MutedVideo;

    const mute = () => services.user.Media.muteVideo();
    const unmute = () => services.user.Media.unmuteVideo();

    if (!settings.enableVideo) {
        return "";
    }

    return (
        <div>
            {
                mutedVideo
                    ? <Svg url={CameraOffIcon} width="2.2" height="2.1" onClick={unmute}/>
                    : <Svg url={CameraIcon} width="2.2" height="1.3" onClick={mute}/>
            }
        </div>
    );
});

const MicrophoneControl = observer(() => {
    const settings = services.conference.Info.Settings;
    const mutedAudio = services.user.Media.MutedAudio;

    const mute = () => services.user.Media.muteAudio();
    const unmute = () => services.user.Media.unmuteAudio();

    if (!settings.enableAudio) {
        return "";
    }

    return (
        <div className={styles.header__controls__mic}>
            {
                mutedAudio 
                    ? <Svg url={MicrophoneOffIcon} width="1.8" height="1.9" onClick={unmute}/>
                    : <Svg url={MicrophoneIcon} width="1.4" height="1.9" onClick={mute}/>
            }
        </div>
    );
});

const ConferenceName = observer(() => {
    const name = services.conference.Info.Name;

    return (
        <div className={styles.header__conference__name}> 
            {name} 
        </div>
    )
})

const Header = () => {
    const router = useRouter();

    const leave = async () => {
        const response = await services.conference.leave();
        const id = services.room.Info.Id;
        router.push(`/room/${id}`);
    }

    return (
        <div className={styles.header}>
            <div className="fl al-center g-3">
                <div className={styles.header__menu}>
                    <Svg url={MenuLeftIcon} width="1.8" height="1.5"/>
                    <Svg url={MenuRightIcon} width="1.8" height="1.5"/>
                </div>

                <div className={styles.header__full}>
                    <Svg url={FullIcon} width="1.4" height="1.4"/>
                </div>

                <ConferenceName />
            </div>

            <div className="fl al-center g-5">
                <div className={styles.header__controls}>
                    <CameraControl />
                    <MicrophoneControl />
                </div>

                <FilledButton onClick={leave} height="3.5rem">
                    <div className={styles.header__leave}>
                        <Svg url={LeaveIcon} width="2.4" height=".9" color="var(--theme-color-secondary)"/>
                        <span> Leave </span>
                    </div>
                </FilledButton>
            </div>
        </div>
    )
}

export default React.memo(Header);