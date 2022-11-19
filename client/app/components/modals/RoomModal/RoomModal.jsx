import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import Modal from "@components/ui/Modal/Modal";
import InputButtonGroup from "@components/ui/InputButtonGroup/InputButtonGroup";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import services from "@services";

import styles from "./RoomModal.module.scss";

const Information = observer(() => {
    const name = services.modals.room.Name;
    const owner = services.modals.room.Owner;

    return (
        <div>
            <div className={styles.room__name}>{name}</div>
            <div className={styles.room__owner}>
                <div className={styles.room__owner__avatar}></div>
                <div className={styles.room__owner__name}>{owner.name}</div>
            </div>
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
            <div className={styles.room__users__loading}>
                <div className="loader"></div>
            </div>
        )
    }

    if (users.length === 0) {
        return (
            <div className={styles.room__users__empty}></div>
        );
    }

    return (
        <div className={styles.room__users}>
            {
                users.map(item => 
                    <div key={item} className={styles.room__user}/>
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
        <div className={styles.room__tags}>
            <div className="text-semibold text-16 text-primary mb-1">Tags</div>
            <div className={styles.room__tags__items}>
                {
                    tags.map(tag => (
                        <div 
                            key={tag.id} 
                            className={styles.room__tags__item} 
                            onClick={(e) => searchByTags(e, tag.name)}
                        >
                            {tag.name}
                        </div>
                    ))
                }
            </div>
        </div>
    );
});

const JoinButton = () => {
    const router = useRouter();

    const [password, setPassword] = React.useState("");

    const join = async () => {
        const id = services.modals.room.Id;
        const response = await services.room.join(id, password);
        if (response.status === 200) {
            services.room.ConferencesInfo.update({ params: { room_id: id } });
            router.push(`/room/${id}`); 
        }
    }

    return (
        <div className={styles.room__btn__join}>
            <InputButtonGroup 
                type="password" 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                onClick={join}
            >
                Join Now
            </InputButtonGroup>  
        </div>
    )
}

const RoomModal = observer(() => {
    const isOpenRoom = services.modals.room.IsOpen;

    const setIsOpenRoom = (value) => {
        services.modals.room.IsOpen = value;
    }

    if (!isOpenRoom) return "";

    return (
        <Modal 
            title="Join To Room"
            isOpen={isOpenRoom} 
            setIsOpen={setIsOpenRoom}
        >
            <div className={styles.wrapper}>
                <Information />
                <ConnectedUsers />
                <Tags />
                <JoinButton />
            </div>
        </Modal>
    )
});

export default RoomModal;