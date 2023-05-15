import { memo } from "react";
import { observer } from "mobx-react-lite";

import Select from "@components/ui/Select/Select";
import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

import services from "@services";

import styles from "./VideoAudio.module.scss";

const AudioInputsSection = observer(() => {
    const audios = services.user.Devices.AudioInputs;
    const selectedAudio = services.user.Devices.SelectedAudioInputDevice;

    const setSelectedAudio = item => services.user.Devices.setSelectedAudioInputDevice(item.id);

    return (
        <div>
            <div className={styles.inputs__section__title}> Микрофон </div>

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

                <OutlinedButton onClick={() => services.user.Devices.checkAudioInputPermission()}>
                    Запросить доступ
                </OutlinedButton>
            </div>
        </div>
    )
})

const VideoInputsSection = observer(() => {
    const videos = services.user.Devices.VideoInputs;
    const selectedVideo = services.user.Devices.SelectedVideoInputDevice;

    const setSelectedVideo = item => services.user.Devices.setSelectedVideoInputDevice(item.id);

    return (
        <div>
            <div className={styles.inputs__section__title}> Камера </div>

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

                <OutlinedButton onClick={() => services.user.Devices.checkVideoInputPermission()}>
                    Запросить доступ
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
                    Видео & Аудио
                </div>
                <div className="text-placeholder">
                    В этой секции вы можете настраивать микрофон и камеру.
                </div>
            </div>

            <div className={styles.selections}>
                <AudioInputsSection />
                <VideoInputsSection />
            </div>
        </div>
    )
}

export default memo(VideoAudioScreen);