import React from "react";
import { autorun } from "mobx";

import Panel from "@components/ui/Panel/Panel";
import PanelHeader from "@components/ui/PanelHeader/PanelHeader";
import SimpleInput from "@components/ui/SimpleInput/SimpleInput";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import stores from "@features/room/store";

import styles from "./RoomSettingsPage.module.scss";

const RoomSettings = () => {
    const [name, setName] = React.useState("");
    const [visibility, setVisibility] = React.useState(false);

    React.useEffect(() => 
        autorun(() => {
            const roomname = stores.room.name;
            setName(roomname)
        })
    , [])

    return (
        <div className={styles.settings}>
            <div className="text-primary"> Room </div>
            <div className="text-placeholder"> You can change settings of room here. </div>
            <div className={styles.settings__items}>
                <div>
                    <div className="mb-1"> Name </div>
                    <SimpleInput value={name} setValue={setName} placeholder="Name"/>
                </div>

                <div>
                    <div className="mb-1">
                        <div> Visibility </div>
                        <div className="text-placeholder"> 
                            If you make a room private, users won't be able to find it. 
                        </div>
                    </div>
                    <CheckBox label="Private" value={visibility} setValue={setVisibility}/>
                </div>
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
                        <RoomSettings />
                        <ConferenceSettings />
                    </div>
                </Panel>
            </div>
        </RoomLayout>
    )
}

export default React.memo(Settings);