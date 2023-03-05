import React from "react"
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

    const setIsOpenModal = value => {
        services.modals.createConference.setIsOpen(value);
    }

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const request = useRequest(ConferenceAPI.create);
    const { data } = useResponse(request);
    useError(request);

    const create = () => {
        const body = {
            room_id: services.room.Info.Id,
            name,
            description,
        }

        request.start({ body });

        setName("");
        setDescription("");
        setIsOpenModal(false);
    }

    React.useEffect(() => {
        if (data && data.status === 200) {
            const room_id = services.room.Info.Id;
            services.room.Conferences.update({ params: { room_id } });
        }
    }, [data])

    return (
        <Modal
            title="Create Conference"
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            width="40rem"
        >
            <div className={styles.modal}>
                <div>
                    <div>General</div>

                    <div className="text-placeholder"> 
                        Fill in the required fields to create a conference
                    </div>
                </div>

                <InputControl 
                    type="text" 
                    placeholder="Name*" 
                    value={name} 
                    setValue={setName}
                />

                <InputControl 
                    type="text" 
                    placeholder="Descriptions" 
                    value={description} 
                    setValue={setDescription}
                />

                <div className="w-50 m-auto mt-1">
                    <FilledButton onClick={create}> Create </FilledButton>
                </div>
            </div>
        </Modal>
    )
})

export default CreateConferenceModal;