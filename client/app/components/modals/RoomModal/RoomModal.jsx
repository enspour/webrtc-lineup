import React from "react";
import { observer } from "mobx-react-lite";

import Modal from "@components/ui/Modal/Modal";
import CheckBox from "@components/ui/CheckBox/CheckBox";
import CenterInput from "@components/ui/CenterInput/CenterInput";
import Svg from "@components/ui/Svg/Svg";

import { IslandSearchTab } from "@features/Island/Island.states";

import services from "@services";

import JoinIcon from "@assets/images/room-modal/join.svg";

import styles from "./RoomModal.module.scss";

const Information = observer(() => {
    const name = services.modals.room.Name;
    const owner = services.modals.room.Owner;

    return (
        <div>
            <div className={styles.room__name}>{name}</div>
            <div className={styles.room__owner__name}>{owner.name}</div>
        </div>
    )
});

const ConnectedUsers = () => {
    return (
        <div className={styles.room__users}>
            <div className="loader"></div>
        </div>
    )
}

const VoiceVideo = () => {
    const [enableVoice, setEnableVoice] = React.useState(true);
    const [enableCamera, setEnableCamera] = React.useState(false);

    return (
        <div className={styles.room__voicevideo}>
            <CheckBox label="Voice" value={enableVoice} setValue={setEnableVoice}/>
            <CheckBox label="Camera" value={enableCamera} setValue={setEnableCamera}/>
        </div>
    )
}

const Tags = observer(() => { 
    const tags = services.modals.room.Tags;

    const searchByTags = (e, name) => {
        e.stopPropagation();
        services.modals.room.IsOpen = false;
        services.island.CurrentId = IslandSearchTab.id;
        services.search.SearchedText = `#${name}`;
    }

    return (
        <div className="fl">
            <span className="text-semibold text-14 text-primary">Tags:</span>
            <span className={styles.room__tags}>
                {
                    tags.map(tag => (
                        <div key={tag.id} className={styles.room__tag} onClick={(e) => searchByTags(e, tag.name)}>
                            {tag.name}
                        </div>
                    ))
                }
            </span>
        </div>
    );
});

const CreatedAt = observer(() => {
    const createdAt = services.modals.room.CreatedAt;

    const options = {
        month: "long", 
        day: "numeric", 
        year: "numeric" 
    }

    return (
        <div className="text-al-center text-semibold text-14 text-primary">
            { new Date(createdAt).toLocaleString("en-US", options) }
        </div>
    )
});

const RoomModal = observer(() => {
    const [password, setPassword] = React.useState("");

    const isOpenRoom = services.modals.room.IsOpen;

    const setIsOpenRoom = (value) => {
        services.modals.room.IsOpen = value;
    }

    const connect = () => {}

    if (!isOpenRoom) return "";

    return (
        <Modal 
            title="Room"
            isOpen={isOpenRoom} 
            setIsOpen={setIsOpenRoom}
        >
            <div className={styles.wrapper}>
                <div className="fl jf-between">
                    <Information />

                    <div className={styles.room__connect}>
                        <CenterInput type="password" placeholder="Password" value={password} setValue={setPassword}/>
                        <Svg url={JoinIcon} width="1.2" height="2" onClick={connect}/>
                    </div>
                </div> 

                <ConnectedUsers />
                <VoiceVideo />
                <Tags />
                <CreatedAt />
            </div>
        </Modal>
    )
});

export default RoomModal;