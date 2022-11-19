import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import FilledButton from "@components/ui/FilledButton/FilledButton";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import Svg from "@components/ui/Svg/Svg";

import SettingsIcon from "@assets/images/room-header/settings.svg";

import services from "@services";

import styles from "./Footer.module.scss";

const VideoControl = observer(() => {
    const mutedVideo = services.userMedia.MutedVideo;

    const setMutedVideo = value => {
        if (value) {
            return services.userMedia.unmuteVideo();
        }

        services.userMedia.muteVideo();
    }

    return (
        <CheckBox
            label="Camera" 
            value={!mutedVideo} 
            setValue={setMutedVideo}
        />
    )
});

const AudioControl = observer(() => {
    const mutedAudio = services.userMedia.MutedAudio;

    const setMutedAudio = value => {
        if (value) {
            return services.userMedia.unmuteAudio();
        }

        services.userMedia.muteAudio();
    }
    
    return (
        <CheckBox
            label="Microphone"
            value={!mutedAudio} 
            setValue={setMutedAudio}
        />
    )
});

const SettingsControl = observer(() => {
    const owner = services.room.RoomInfo.Owner;

    const router = useRouter();

    const openSettings = () => {
        const roomId = services.room.RoomInfo.Id;
        router.push(`/room/${roomId}/settings`);
    }

    if (owner.id !== services.user.Id) {
        return "";
    }

    return <Svg url={SettingsIcon} width="2" height="2" onClick={openSettings}/>
});

const LeaveControl = () => {
    const router = useRouter();

    const leave = async () => {
        const response = await services.room.leave();
        router.push("/");
    }

    return (
        <div className={styles.header__control__leave}>
            <FilledButton onClick={leave} height="3.5rem">
                Leave
            </FilledButton>
        </div>
    )
}

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className="fl al-center g-2">
                <AudioControl />
                <VideoControl />
            </div>

            <div className="fl al-center g-2">
                <SettingsControl />
                <LeaveControl />
            </div>
        </div>
    )
}

export default Footer;