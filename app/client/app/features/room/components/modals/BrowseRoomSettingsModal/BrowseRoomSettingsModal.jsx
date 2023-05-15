import { useState } from "react";
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
    const [name, setName] = useState(services.room.Info.Name);

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
            <div className="mb-1"> Название </div>
            <EditInput value={name} setValue={setName} placeholder="Название" onClick={save}/>
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
                <div> Видимость комнаты </div>
                <div className="text-placeholder"> 
                    Вы можете скрыть комнату, чтобы другие пользователи не могли найти её. 
                </div>
            </div>
            <CheckBox label="Видимость" value={settings.visibility} setValue={setVisibility}/>
        </div>
    )
})

const BrowseRoomSettingsModal = observer(() => {
    const name = services.room.Info.Name;

    const isOpenModal = services.modals.browseRoomSettings.IsOpen;

    const close = () => {
        services.modals.browseRoomSettings.close();
    }

    return (
        <Modal
            title={`Настройки комнаты | ${name}`}
            isOpen={isOpenModal}
            close={close}
            width="90rem"
        >
            <div className={styles.settings}>
                <div className="text-primary"> Основное </div>
                <div className="text-placeholder"> Здесь вы можете изменять настройки комнаты. </div>
                <div className={styles.settings__items}>
                    <RoomNameSettings />
                    <RoomVisibilitySettings />
                </div>
            </div>
        </Modal>
    )
});

export default BrowseRoomSettingsModal;