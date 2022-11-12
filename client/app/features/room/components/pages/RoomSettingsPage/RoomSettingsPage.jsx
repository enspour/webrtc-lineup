import React from "react";
import { autorun } from "mobx";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";
import EditInput from "@components/ui/EditInput/EditInput";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import services from "@services";

import styles from "./RoomSettingsPage.module.scss";

const RoomNameSettings = () => {
    const [name, setName] = React.useState("");

    React.useEffect(() => 
        autorun(() => {
            const roomname = services.room.Name;
            setName(roomname)
        })
    , [])

    return (
        <div>
            <div className="mb-1"> Name </div>
            <EditInput value={name} setValue={setName} placeholder="Name"/>
        </div>
    )
}

const RoomVisibilitySettings = () => {
    const [visibility, setVisibility] = React.useState(false);

    return (
        <div>
            <div className="mb-1">
                <div> Visibility </div>
                <div className="text-placeholder"> 
                    If you make a room private, users won't be able to find it. 
                </div>
            </div>
            <CheckBox label="Private" value={visibility} setValue={setVisibility}/>
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


const ConferenceSettings = () => {
    const [enableAudio, setEnableAudio] = React.useState(false);
    const [enableVoice, setEnableVoice] = React.useState(false);

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
                        <CheckBox label="Enable audio" value={enableAudio} setValue={setEnableAudio}/>
                        <CheckBox label="Enable voice" value={enableVoice} setValue={setEnableVoice}/>
                    </div>
                </div>
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