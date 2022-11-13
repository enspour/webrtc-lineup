import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";
import EditInput from "@components/ui/EditInput/EditInput";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import services from "@services";

import styles from "./RoomSettingsPage.module.scss";

const RoomNameSettings = () => {
    const [name, setName] = React.useState(services.room.RoomInfo.Name);

    const request = useRequest(services.roomAPI.updateName);
    const { data } = useResponse(request);

    const save = () => {
        const body = {
            id: services.room.RoomInfo.Id,
            name: name
        }

        request.start({ body });
    }

    React.useEffect(() => {
        if (data && data.status === 200) {
            const { name } = data.body;
            services.room.RoomInfo.setName(name);
        }
    }, [data]);

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
    const { data } = useResponse(request);

    const setVisibility = (value) => {
        const body = {
            id: services.room.RoomInfo.Id,
            visibility: value
        }

        request.start({ body });
    }

    React.useEffect(() => {
        if (data && data.status === 200) {
            const { visibility } = data.body;
            services.room.RoomInfo.setSettings(prev => ({ ...prev, visibility }));
        }
    }, [data])

    return (
        <div>
            <div className="mb-1">
                <div> Visibility </div>
                <div className="text-placeholder"> 
                    If you make a room private, users won't be able to find it. 
                </div>
            </div>
            <CheckBox label="Public" value={settings.visibility} setValue={setVisibility}/>
        </div>
    )
})

const ConferenceAudioSettings = observer(() => {
    const settings = services.room.RoomInfo.Settings;

    const request = useRequest(services.roomSettingsAPI.updateEnableAudio);
    const { data } = useResponse(request);

    const setEnableAudio = (value) => {
        const body = {
            id: services.room.RoomInfo.Id,
            enable_audio: value
        }

        request.start({ body });
    }

    React.useEffect(() => {
        if (data && data.status === 200) {
            const { enable_audio } = data.body;
            services.room.RoomInfo.setSettings(prev => ({ ...prev, enable_audio }));
        }
    }, [data])

    return <CheckBox label="Enable audio" value={settings.enable_audio} setValue={setEnableAudio}/>
});

const ConferenceVideoSettings = observer(() => {
    const settings = services.room.RoomInfo.Settings;

    const request = useRequest(services.roomSettingsAPI.updateEnableVideo);
    const { data } = useResponse(request);

    const setEnableVideo = (value) => {
        const body = {
            id: services.room.RoomInfo.Id,
            enable_video: value
        }

        request.start({ body });
    }

    React.useEffect(() => {
        if (data && data.status === 200) {
            const { enable_video } = data.body;
            services.room.RoomInfo.setSettings(prev => ({ ...prev, enable_video }));
        }
    }, [data])

    return <CheckBox label="Enable Video" value={settings.enable_video} setValue={setEnableVideo}/>
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
    return (
        <RoomLayout title="Lineup | Settings">
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 5rem - 4rem)">
                    <PanelHeader title="Settings"/>

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