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

    const [name, setName] = useState("");
    const [password, setPassword] = useState(""); 
    const [tags, setTags] = useState(new Set());
    
    const request = useRequest(RoomAPI.create);
    const { data } = useResponse(request);
    useError(request)

    const close = () => {
        services.modals.createRoom.close();
    }

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
        close();
    }

    useEffect(() => {
        if (data) {
            services.user.CreatedRooms.update();
        }
    }, [data]);

    return (
        <Modal
            title="Создание комнаты"
            isOpen={isOpenModal} 
            close={close}
            width="50rem"
        >
            <div className={styles.modal}>
                <div className="mb-1">
                    <div>Основное</div>

                    <div className="text-placeholder"> 
                        Заполните все необходимые поля, чтобы создать комнату
                    </div>
                </div>

                <div className={styles.modal__fields}>
                    <InputControl type="text" placeholder="Название*" value={name} setValue={setName}/>

                    <InputControl 
                        type="password"
                        placeholder="Пароль" 
                        value={password} 
                        setValue={setPassword}
                    />

                    <CreateRoomModalTags tags={tags} setTags={setTags}/>
                </div>

                <div className="w-50 m-auto">
                    <FilledButton onClick={create}> Создать </FilledButton>
                </div>
            </div>
        </Modal>
    );
})

export default CreateRoomModal;