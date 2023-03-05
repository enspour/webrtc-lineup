import { useState } from "react";
import { observer } from "mobx-react-lite";

import ConferenceAPI from "@api/ConferenceAPI";

import Modal from "@components/ui/Modal/Modal";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import EditInput from "@components/ui/EditInput/EditInput";

import useRequest from '@hooks/api/useRequest';
import useError from "@hooks/api/useError";

import services from "@services";

import styles from "./BrowseConferenceSettingsModal.module.scss";

const ConferenceAudioSettings = observer(({ conference }) => {
    const settings = conference.settings;
    
    const request = useRequest(ConferenceAPI.updateEnableAudio);
    
    const setEnableAudio = (value) => {
        const body = {
            room_id: services.room.Info.Id,
            conference_id: conference.id,
            enable_audio: value
        }

        request.start({ body });
    }

    return <CheckBox label="Enable Audio" value={settings.enableAudio} setValue={setEnableAudio}/>
});

const ConferenceVideoSettings = observer(({ conference }) => {
    const settings = conference.settings;

    const request = useRequest(ConferenceAPI.updateEnableVideo);

    const setEnableVideo = (value) => {
        const body = {
            room_id: services.room.Info.Id,
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
            <div className={styles.settings__conference__videoaudio}>
                <ConferenceAudioSettings conference={conference}/>
                <ConferenceVideoSettings conference={conference}/>
            </div>
        </div>
    )
}

const ConferenceNameSettings = ({ conference }) => {
    const [name, setName] = useState(conference.name);

    const request = useRequest(ConferenceAPI.updateName);
    useError(request)

    const updateName = () => {
        const body = {
            room_id: services.room.Info.Id,
            conference_id: conference.id,
            name
        }

        request.start({ body });
    }

    return (
        <div>
            <div className="mb-1"> Name </div>

            <EditInput 
                value={name} 
                setValue={setName} 
                placeholder="Name" 
                onClick={updateName}
            />
        </div>
    )
}

const ConferenceDescriptionSettings = ({ conference }) => {
    const [description, setDescription] = useState(conference.description);

    const request = useRequest(ConferenceAPI.updateDescription);
    useError(request)

    const updateDescription = () => {
        const body = {
            room_id: services.room.Info.Id,
            conference_id: conference.id,
            description
        }

        request.start({ body });
    }

    return (
        <div>
            <div className="mb-1"> Description </div>

            <EditInput 
                value={description} 
                setValue={setDescription} 
                placeholder="Description" 
                onClick={updateDescription}
            />
        </div>
    )
}

const BrowseConferenceSettingsModal = observer(() => {
    const conference = services.modals.browseConferenceSettings.Conference;

    const isOpenModal = services.modals.browseConferenceSettings.IsOpen;

    const setIsOpenModal = value => {
        services.modals.browseConferenceSettings.setIsOpen(value);
    }

    return (
        <Modal
            title={`Conference Settings | ${conference.name}`}
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            width="90rem"
        >
            <div className={styles.settings}> 
                <div className="text-primary"> Conference </div>
                <div className="text-placeholder"> You can change settings of conference here. </div>
                <div className={styles.settings__items}>
                    <ConferenceNameSettings conference={conference}/>
                    <ConferenceDescriptionSettings conference={conference}/>
                    <ConferenceAudioVideoSettings conference={conference}/>
                </div>
            </div>
        </Modal>
    )
})

export default BrowseConferenceSettingsModal;