import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import ConferenceAPI from "@api/ConferenceAPI";

import Modal from "@components/ui/Modal/Modal";
import InputControl from "@components/ui/InputControl/InputControl";
import FilledButton from "@components/ui/FilledButton/FilledButton";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";
import useError from "@hooks/api/useError";

import services from "@services";

import styles from "./CreateConferenceModal.module.scss";

const CreateConferenceModal = observer(() => {
    const isOpenModal = services.modals.createConference.IsOpen;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const request = useRequest(ConferenceAPI.create);
    const { data } = useResponse(request);
    useError(request);

    const close = () => {
        services.modals.createConference.close();
    }

    const create = () => {
        const body = {
            room_id: services.room.Info.Id,
            name,
            description,
        }

        request.start({ body });

        setName("");
        setDescription("");
        close(false);
    }

    useEffect(() => {
        if (data && data.status === 200) {
            services.room.Conferences.update();
        }
    }, [data])

    return (
        <Modal
            title="Создание конференции"
            isOpen={isOpenModal}
            close={close}
            width="40rem"
        >
            <div className={styles.modal}>
                <div>
                    <div>Основное</div>

                    <div className="text-placeholder"> 
                        Заполните все необходимые поля, чтобы создать конференцию
                    </div>
                </div>

                <InputControl 
                    type="text" 
                    placeholder="Название*" 
                    value={name} 
                    setValue={setName}
                />

                <InputControl 
                    type="text" 
                    placeholder="Описание" 
                    value={description} 
                    setValue={setDescription}
                />

                <div className="w-50 m-auto mt-1">
                    <FilledButton onClick={create}> Создать </FilledButton>
                </div>
            </div>
        </Modal>
    )
});

export default CreateConferenceModal;