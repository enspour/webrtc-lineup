import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import FilledButton from "@components/ui/FilledButton/FilledButton";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import Svg from "@components/ui/Svg/Svg";

import SettingsIcon from "@assets/images/room-footer/settings.svg";
import CreateIcon from "@assets/images/room-footer/create.svg";

import services from "@services";

import styles from "./Footer.module.scss";

const VideoControl = observer(() => {
    const mutedVideo = services.user.Media.MutedVideo;

    const setMutedVideo = value => {
        if (value) {
            return services.user.Media.unmuteVideo();
        }

        services.user.Media.muteVideo();
    }

    return (
        <CheckBox
            label="Камера" 
            value={!mutedVideo} 
            setValue={setMutedVideo}
        />
    )
});

const AudioControl = observer(() => {
    const mutedAudio = services.user.Media.MutedAudio;

    const setMutedAudio = value => {
        if (value) {
            return services.user.Media.unmuteAudio();
        }

        services.user.Media.muteAudio();
    }
    
    return (
        <CheckBox
            label="Микрофон"
            value={!mutedAudio} 
            setValue={setMutedAudio}
        />
    )
});

const SettingsControl = observer(() => {
    const owner = services.room.Info.Owner;

    const openSettings = () => {
        services.modals.browseRoomSettings.open();
    }

    if (owner.id !== services.user.Info.Id) {
        return "";
    }

    return <Svg url={SettingsIcon} width="1.8" height="1.8" onClick={openSettings}/>
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
                Покинуть
            </FilledButton>
        </div>
    )
}

const CreateControl = () => {
    const owner = services.room.Info.Owner;
    
    const open = () => {
        services.modals.createConference.open();
    }

    if (owner.id !== services.user.Info.Id) {
        return "";
    }

    return (
        <Svg url={CreateIcon} width="1.4" height="1.4" onClick={open}/>
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
                <CreateControl />
                <SettingsControl />
                <LeaveControl />
            </div>
        </div>
    )
}

export default React.memo(Footer);