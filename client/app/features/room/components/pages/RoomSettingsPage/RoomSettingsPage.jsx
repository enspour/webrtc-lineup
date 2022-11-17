import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";
import EditInput from "@components/ui/EditInput/EditInput";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import useRequest from "@hooks/api/useRequest";

import services from "@services";

import styles from "./RoomSettingsPage.module.scss";

const RoomNameSettings = () => {
    const [name, setName] = React.useState(services.room.RoomInfo.Name);

    const request = useRequest(services.roomAPI.updateName);

    const save = () => {
        const body = {
            id: services.room.RoomInfo.Id,
            name: name
        }

        request.start({ body });
    }

    return (
        <div>
            <div className="mb-1"> Name </div>
            <EditInput value={name} setValue={setName} placeholder="Name" onClick={save}/>
        </div>
    )
}

const RoomVisibilitySettings = observer(() => {
    const settings = services.room.RoomInfo.Settings;

    const request = useRequest(services.roomSettingsAPI.updateVisibility);

    const setVisibility = (value) => {
        const body = {
            id: services.room.RoomInfo.Id,
            visibility: value
        }

        request.start({ body });
    }

    return (
        <div>
            <div className="mb-1">
                <div> Visibility </div>
                <div className="text-placeholder"> 
                    If you make the room hidden, users won't be able to find it. 
                </div>
            </div>
            <CheckBox label="Make Visible" value={settings.visibility} setValue={setVisibility}/>
        </div>
    )
})

const ConferenceAudioSettings = observer(() => {
    const settings = services.room.RoomInfo.Settings;

    const request = useRequest(services.roomSettingsAPI.updateEnableAudio);

    const setEnableAudio = (value) => {
        const body = {
            id: services.room.RoomInfo.Id,
            enable_audio: value
        }

        request.start({ body });
    }

    return <CheckBox label="Enable Audio" value={settings.enableAudio} setValue={setEnableAudio}/>
});

const ConferenceVideoSettings = observer(() => {
    const settings = services.room.RoomInfo.Settings;

    const request = useRequest(services.roomSettingsAPI.updateEnableVideo);

    const setEnableVideo = (value) => {
        const body = {
            id: services.room.RoomInfo.Id,
            enable_video: value
        }

        request.start({ body });
    }

    return <CheckBox label="Enable Video" value={settings.enableVideo} setValue={setEnableVideo}/>
});

const ConferenceSettings = () => {
    return (
        <div className={styles.settings}> 
            <div className="text-primary"> Conference </div>
            <div className="text-placeholder"> You can change settings of conference here. </div>
            <div className={styles.settings__items}>
                <div>
                    <div className="mb-1">
                        <div>Voice & Audio</div>
                        <div className="text-placeholder"> You can disable video or audio in conference</div>
                    </div>
                    <div className={styles.settings__conference__voiceaudio}>
                        <ConferenceAudioSettings />
                        <ConferenceVideoSettings />
                    </div>
                </div>
            </div>
        </div>
    )
}

const GeneralSettings = () => {
    return (
        <div className={styles.settings}>
            <div className="text-primary"> General </div>
            <div className="text-placeholder"> You can change general settings here. </div>
            <div className={styles.settings__items}>
                <RoomNameSettings />
                <RoomVisibilitySettings />
            </div>
        </div>
    )
}

const Settings = () => {
    const router = useRouter();

    const back = () => router.back();

    return (
        <RoomLayout title="Lineup | Settings">
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 5rem - 4rem)">
                    <PanelHeader title="Settings" onClick={back}/>

                    <div className={styles.wrapper}>
                        <GeneralSettings />
                        <ConferenceSettings />
                    </div>
                </Panel>
            </div>
        </RoomLayout>
    )
}

export default React.memo(Settings);