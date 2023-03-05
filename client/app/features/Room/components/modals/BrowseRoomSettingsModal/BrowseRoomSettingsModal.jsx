import React from "react";
import { observer } from "mobx-react-lite";

import RoomAPI from "@api/RoomAPI";

import Modal from "@components/ui/Modal/Modal";
import EditInput from "@components/ui/EditInput/EditInput";
import CheckBox from "@components/ui/CheckBox/CheckBox";

import useRequest from "@hooks/api/useRequest";
import useError from "@hooks/api/useError";

import services from "@services";

import styles from "./BrowseRoomSettingsModal.module.scss";

const RoomNameSettings = () => {
    const [name, setName] = React.useState(services.room.Info.Name);

    const request = useRequest(RoomAPI.updateName);
    useError(request)

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

    const request = useRequest(RoomAPI.updateVisibility);

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

const BrowseRoomSettingsModal = observer(() => {
    const name = services.room.Info.Name;

    const isOpenModal = services.modals.browseRoomSettings.IsOpen;

    const setIsOpenModal = value => {
        services.modals.browseRoomSettings.setIsOpen(value);
    }

    return (
        <Modal
            title={`Room Settings | ${name}`}
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            width="90rem"
        >
            <div className={styles.settings}>
                <div className="text-primary"> General </div>
                <div className="text-placeholder"> You can change general settings here. </div>
                <div className={styles.settings__items}>
                    <RoomNameSettings />
                    <RoomVisibilitySettings />
                </div>
            </div>
        </Modal>
    )
})

export default BrowseRoomSettingsModal;