import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import PanelPlusHeader from "@components/ui/PanelPlusHeader/PanelPlusHeader";
import EditInput from "@components/ui/EditInput/EditInput";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import useRequest from "@hooks/api/useRequest";

import services from "@services";

import styles from "./RoomSettingsPage.module.scss";

const RoomNameSettings = () => {
    const [name, setName] = React.useState(services.room.Info.Name);

    const request = useRequest(services.roomAPI.updateName);

    const save = () => {
        const body = {
            id: services.room.Info.Id,
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
    const settings = services.room.Info.Settings;

    const request = useRequest(services.roomAPI.updateVisibility);

    const setVisibility = (value) => {
        const body = {
            id: services.room.Info.Id,
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

const RoomSettingsPage = () => {
    const router = useRouter();

    const back = () => router.back();

    return (
        <RoomLayout title="Lineup | Settings">
            <div className={styles.container}>
                <PanelPlusHeader 
                    title="Settings" 
                    onClick={back} 
                    maxHeight="calc(100vh - 17rem)"
                >
                    <GeneralSettings />
                </PanelPlusHeader>
            </div>
        </RoomLayout>
    )
}

export default React.memo(RoomSettingsPage);