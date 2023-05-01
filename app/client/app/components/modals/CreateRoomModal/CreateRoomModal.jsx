import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import RoomAPI from "@api/RoomAPI";

import Modal from "@components/ui/Modal/Modal";
import InputControl from "@components/ui/InputControl/InputControl";
import FilledButton from "@components/ui/FilledButton/FilledButton";

import CreateRoomModalTags from "./CreateRoomModalTags";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";
import useError from "@hooks/api/useError";

import services from "@services";

import styles from "./CreateRoomModal.module.scss";

const CreateRoomModal = observer(() => {
    const isOpenModal = services.modals.createRoom.IsOpen;

    const setIsOpenModal = value => {
        services.modals.createRoom.setIsOpen(value);
    }

    const [name, setName] = useState("");
    const [password, setPassword] = useState(""); 
    const [tags, setTags] = useState(new Set());
    
    const request = useRequest(RoomAPI.create);
    const { data } = useResponse(request);
    useError(request)

    const create = () => {
        const body = {
            name,
            password, 
            tags: [...tags]
        }

        request.start({ body });

        setName("");
        setPassword("");
        setTags(new Set());
        setIsOpenModal(false);
    }

    useEffect(() => {
        if (data) {
            services.userCreatedRooms.update();
        }
    }, [data]);

    return (
        <Modal
            title="Create Room"
            isOpen={isOpenModal} 
            setIsOpen={setIsOpenModal}
            width="50rem"
        >
            <div className={styles.modal}>
                <div className="mb-1">
                    <div>General</div>

                    <div className="text-placeholder"> 
                        Fill in the required fields to create a room
                    </div>
                </div>

                <div className={styles.modal__fields}>
                    <InputControl type="text" placeholder="Name*" value={name} setValue={setName}/>

                    <InputControl 
                        type="password"
                        placeholder="Password" 
                        value={password} 
                        setValue={setPassword}
                    />

                    <CreateRoomModalTags tags={tags} setTags={setTags}/>
                </div>

                <div className="w-50 m-auto">
                    <FilledButton onClick={create}> Create </FilledButton>
                </div>
            </div>
        </Modal>
    );
})

export default CreateRoomModal;