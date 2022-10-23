import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import Modal from "@components/ui/Modal/Modal";
import CenterInput from "@components/ui/CenterInput/CenterInput";
import Svg from "@components/ui/Svg/Svg";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import services from "@services";

import JoinIcon from "@assets/images/room-modal/join.svg";

import styles from "./RoomModal.module.scss";

const Information = observer(() => {
    const name = services.modals.room.Name;
    const owner = services.modals.room.Owner;

    return (
        <div className="w-60">
            <div className={styles.room__name}>{name}</div>
            <div className={styles.room__owner__name}>{owner.name}</div>
        </div>
    )
});

const ConnectedUsers = observer(() => {
    const [users, setUsers] = React.useState([]);

    const request = useRequest(services.roomAPI.getUsersInRoom);
    const { data } = useResponse(request);

    React.useEffect(() => 
        autorun(() => {
            const id = services.modals.room.Id;
            request.start({ params: { roomId: id }});
        })
    , []);

    React.useEffect(() => {
        if (data) setUsers([...new Set(data.body.users)]);
    }, [data])

    if (request.isLoading) {
        return (
            <div className={styles.room__connected__users}>
                <div className="loader"></div>
            </div>
        )
    }

    if (users.length === 0) {
        return "";
    }

    return (
        <div className={styles.room__connected__users}>
            {
                users.map(item => 
                    <div key={item} className={styles.room__connected__user}/>
                )
            }
        </div>
    )
});

const Tags = observer(() => { 
    const tags = services.modals.room.Tags;

    const searchByTags = (e, name) => {
        e.stopPropagation();
        services.modals.room.IsOpen = false;
        services.island.goSearch();
        services.search.SearchedText = `#${name}`;
    }

    return (
        <div className="fl mt-4 mb-4">
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
        year: "numeric",
    }

    return (
        <div className="text-al-center text-semibold text-14 text-primary">
            { new Date(createdAt).toLocaleString("en-US", options) }
        </div>
    )
});

const RoomModal = observer(() => {
    const router = useRouter();

    const [password, setPassword] = React.useState("");

    const isOpenRoom = services.modals.room.IsOpen;

    const setIsOpenRoom = (value) => {
        services.modals.room.IsOpen = value;
    }

    const join = async () => {
        const id = services.modals.room.Id;
        const response = await services.roomConnection.join(id, password)
        
        console.log(response);

        if (response.status === 200) router.push("/room"); 
    }

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
                        <Svg url={JoinIcon} width="1.2" height="2" onClick={join}/>
                    </div>
                </div> 

                <ConnectedUsers />
                <Tags />
                <CreatedAt />
            </div>
        </Modal>
    )
});

export default RoomModal;