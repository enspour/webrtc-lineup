import React from "react";
import { observer } from "mobx-react-lite";

import Select from "@components/ui/Select/Select";
import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

import services from "@services";

import styles from "./VideoAudio.module.scss";

const AudioInputsSection = observer(() => {
    const audios = services.userDevices.AudioInputs;
    const selectedAudio = services.userDevices.SelectedAudioInputDevice;

    const setSelectedAudio = item => services.userDevices.setSelectedAudioInputDevice(item.id);

    return (
        <div>
            <div className={styles.inputs__section__title}> Microphone </div>

            <div className={styles.inputs__section}>
                <div className={styles.inputs__section__select}>
                    <Select 
                        options={
                            audios
                                .filter(item => item.deviceId)
                                .map(item => ({ id: item.deviceId, label: item.label }))
                        } 
                        value={{ id: selectedAudio.deviceId, label: selectedAudio.label }}
                        setValue={setSelectedAudio}
                    />
                </div>

                <OutlinedButton onClick={() => services.userDevices.checkAudioInputPermission()}>
                    Permission
                </OutlinedButton>
            </div>
        </div>
    )
})

const VideoInputsSection = observer(() => {
    const videos = services.userDevices.VideoInputs;
    const selectedVideo = services.userDevices.SelectedVideoInputDevice;

    const setSelectedVideo = item => services.userDevices.setSelectedVideoInputDevice(item.id);

    return (
        <div>
            <div className={styles.inputs__section__title}> Camera </div>

            <div className={styles.inputs__section}>
                <div className={styles.inputs__section__select}>
                    <Select 
                        options={
                            videos
                                .filter(item => item.deviceId)
                                .map(item => ({ id: item.deviceId, label: item.label }))
                        } 
                        value={{ id: selectedVideo.deviceId, label: selectedVideo.label }}
                        setValue={setSelectedVideo}
                    />
                </div>

                <OutlinedButton onClick={() => services.userDevices.checkVideoInputPermission()}>
                    Permission
                </OutlinedButton>
            </div>
        </div>

    )
})

const VideoAudioScreen = () => {
    return (
        <div className={styles.video__audio}>
            <div>
                <div className="text-primary">
                    Video & Audio
                </div>
                <div className="text-placeholder">
                    Here section of your video & audio settings
                </div>
            </div>

            <div className={styles.selections}>
                <AudioInputsSection />
                <VideoInputsSection />
            </div>
        </div>
    )
}

export default React.memo(VideoAudioScreen);