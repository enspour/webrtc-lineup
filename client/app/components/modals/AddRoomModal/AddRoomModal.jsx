import React from "react";

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

import styles from "./AddRoomModal.module.scss";

const ListTags = ({ tags, setTags }) => {
    const removeTag = (name) => setTags(prev => prev.filter(item => item !== name)); 

    return (
        <div className={styles.tags}>
            <div className={styles.tags__title}>Tags: </div>
            <div className={styles.tags__items}>
                {
                    tags.map(item => (
                        <div 
                            key={item} 
                            className={styles.tags__item} 
                            onClick={() => removeTag(item)}
                        > 
                            {item} 
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const InputTags = ({ tags, setTags }) => {
    const [tag, setTag] = React.useState("");

    const customSetTag = (value) => {
        const splited = value.replace("#", "").split(" ");
        setTag(splited.join(""));
    }

    const pushTag = () => {
        if (tag && !tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
            setTag("");
        }
    }

    return (
        <div className={styles.tag}>
            <InputControl type="text" placeholder="Tag" value={tag} setValue={customSetTag}/>
            
            <div>
                <FilledButton onClick={pushTag}>
                    <div className={styles.tag__btn}>
                        <Svg url={AddIcon} width="1.4" height="1.4"/>
                    </div>
                </FilledButton>
            </div>
        </div>
    )
}


const AddRoomModal = ({ isOpen, setIsOpen }) => {
    const request = useRequest(services.roomAPI.create);
    const { data } = useResponse(request);

    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [privateRoom, setPrivateRoom] = React.useState(true);
    const [tags, setTags] = React.useState([]);

    const passwordRef = useCssAnimation(styles.hidden, !privateRoom, [privateRoom]);

    const addRoom = () => {
        request.start({ body: { name, password, tags } });
        setName("");
        setPassword("");
        setTags([]);
        setIsOpen(false);
    }

    React.useEffect(() => {
        if (data) {
            services.userRooms.update();
        }
    }, [data]);

    return (
        <Modal 
            title="Room"
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
        >
            <InputControl type="text" placeholder="Name" value={name} setValue={setName}/>
            
            <div className={styles.private}>
                <CheckBox label="Private room" value={privateRoom} setValue={setPrivateRoom}/>
            </div>

            <div className={styles.password} ref={passwordRef}>
                <InputControl 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword}
                />
            </div>

            <InputTags tags={tags} setTags={setTags}/>
            <ListTags tags={tags} setTags={setTags}/>

            <FilledButton onClick={addRoom}> Create </FilledButton>
        </Modal>
    );
}

export default AddRoomModal;