import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import useRequest from '@hooks/api/useRequest';

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import EditInput from "@components/ui/EditInput/EditInput";

import services from "@services";

import styles from "./ConferenceSettingsPage.module.scss";

const ConferenceAudioSettings = observer(({ conference }) => {
    const settings = conference.settings;
    
    const request = useRequest(services.conferenceAPI.updateEnableAudio);
    
    const setEnableAudio = (value) => {
        const body = {
            conference_id: conference.id,
            enable_audio: value
        }

        request.start({ body });
    }

    return <CheckBox label="Enable Audio" value={settings.enableAudio} setValue={setEnableAudio}/>
});

const ConferenceVideoSettings = observer(({ conference }) => {
    const settings = conference.settings;

    const request = useRequest(services.conferenceAPI.updateEnableVideo);

    const setEnableVideo = (value) => {
        const body = {
            conference_id: conference.id,
            enable_video: value
        }

        request.start({ body });
    }

    return <CheckBox label="Enable Video" value={settings.enableVideo} setValue={setEnableVideo}/>
});

const ConferenceAudioVideoSettings = ({ conference }) => {
    return (
        <div>
            <div className="mb-1">
                <div>Voice & Audio</div>
                <div className="text-placeholder"> You can disable video or audio in conference</div>
            </div>
            <div className={styles.settings__conference__voiceaudio}>
                <ConferenceAudioSettings conference={conference}/>
                <ConferenceVideoSettings conference={conference}/>
            </div>
        </div>
    )
}

const ConferenceNameSettings = ({ conference }) => {
    const [name, setName] = React.useState(conference.name);

    return (
        <div>
            <div className="mb-1"> Name </div>
            <EditInput value={name} setValue={setName} placeholder="Name"/>
        </div>
    )
}

const ConferenceDescriptionSettings = ({ conference }) => {
    const [description, setDescription] = React.useState(conference.description);

    return (
        <div>
            <div className="mb-1"> Description </div>
            <EditInput value={description} setValue={setDescription} placeholder="Desciprion"/>
        </div>
    )
}

const ConferenceSettings = ({ conference }) => {
    return (
        <div className={styles.settings}> 
            <div className="text-primary"> Conference </div>
            <div className="text-placeholder"> You can change settings of conference here. </div>
            <div className={styles.settings__items}>
                <ConferenceNameSettings conference={conference}/>
                <ConferenceDescriptionSettings conference={conference}/>
                <ConferenceAudioVideoSettings conference={conference}/>
            </div>
        </div>
    )
};

const ConferenceSettingsPage = () => {
    const router = useRouter();
    const { roomId, conferenceId } = router.query;

    const conference = services.room.ConferencesInfo.Array
        .find(item => item.id === `${roomId}|${conferenceId}`) || { settings: {} };

    const back = () => router.back();

    return (
        <RoomLayout title="Lineup | Settings">
            <div className={styles.container}>
                <Panel maxHeight="calc(100vh - 17rem)">
                    <PanelHeader title={conference.name} onClick={back}/>

                    <div className={styles.wrapper}>
                        <ConferenceSettings conference={conference}/>
                    </div>
                </Panel>
            </div>
        </RoomLayout>
    )
}

export default React.memo(ConferenceSettingsPage);