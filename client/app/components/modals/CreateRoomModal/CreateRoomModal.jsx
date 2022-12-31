import React from "react";
import { observer } from "mobx-react-lite";

import RoomAPI from "@api/RoomAPI";

import Modal from "@components/ui/Modal/Modal";
import InputControl from "@components/ui/InputControl/InputControl";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import FilledButton from "@components/ui/FilledButton/FilledButton";
import Svg from "@components/ui/Svg/Svg";

import useCssAnimation from "@hooks/css/useCssAnimation";
import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import AddIcon from "@assets/images/create-room-modal/add.svg";

import services from "@services";

import styles from "./CreateRoomModal.module.scss";

const Tags = React.memo(({ tags, setTags }) => {
    const removeTag = (name) => setTags(prev => prev.filter(item => item !== name)); 

    return (
        <div className={styles.room__tags}>
            <div className={styles.room__tags__title}>Tags</div>
            <div className={styles.room__tags__items}>
                {
                    tags.map(item => (
                        <div 
                            key={item} 
                            className={styles.room__tags__item} 
                            onClick={() => removeTag(item)}
                        > 
                            {item} 
                        </div>
                    ))
                }
            </div>
        </div>
    )
});

const InputTags = React.memo(({ tags, setTags }) => {
    const [tag, setTag] = React.useState("");

    const customSetTag = (value) => {
        const separated = value.replace("#", "").split(" ");
        setTag(separated.join(""));
    }

    const appendTag = () => {
        if (tag && !tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
            setTag("");
        }
    }

    return (
        <div className={styles.room__tag}>
            <InputControl type="text" placeholder="Tag" value={tag} setValue={customSetTag}/>
            
            <div className={styles.room__tag__btn}>
                <Svg 
                    url={AddIcon} 
                    width="1.4" 
                    height="1.4" 
                    onClick={appendTag}
                />
            </div>
        </div>
    )
});


const CreateRoomModal = observer(() => {
    const isOpenModal = services.modals.createRoom.IsOpen;

    const setIsOpenModal = value => {
        services.modals.createRoom.setIsOpen(value);
    }

    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [privateRoom, setPrivateRoom] = React.useState(true);
    const [tags, setTags] = React.useState([]);

    const passwordRef = useCssAnimation(styles.hidden, !privateRoom, [privateRoom]);
    
    const request = useRequest(RoomAPI.create);
    const { data } = useResponse(request);

    const create = () => {
        const body = {
            name,
            password, 
            tags
        }

        request.start({ body });

        setName("");
        setPassword("");
        setTags([]);
        setIsOpenModal(false);
    }

    React.useEffect(() => {
        if (data) {
            services.userRooms.update();
        }
    }, [data]);

    return (
        <Modal
            title="Create Room"
            isOpen={isOpenModal} 
            setIsOpen={setIsOpenModal}
            width="45rem"
        >
            <InputControl type="text" placeholder="Name" value={name} setValue={setName}/>
            
            <div className={styles.room__private}>
                <CheckBox label="Secure room" value={privateRoom} setValue={setPrivateRoom}/>
            </div>

            <div className={styles.room__password} ref={passwordRef}>
                <InputControl 
                    type="password"
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword}
                />
            </div>

            <InputTags tags={tags} setTags={setTags}/>
            <Tags tags={tags} setTags={setTags}/>

            <div className="w-50 m-auto">
                <FilledButton onClick={create}> Create </FilledButton>
            </div>
        </Modal>
    );
})

export default CreateRoomModal;