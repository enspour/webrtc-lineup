import { useState, useEffect } from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";
import Loader from "@components/ui/Loader/Loader";

import services from "@services";

import styles from "./Store.module.scss";

const Store = observer(() => {
    const state = services.user.CreatedRooms.Status;

    const [rooms, setRooms] = useState([]);

    useEffect(() =>
        autorun(() => {
            const rooms = services.user.CreatedRooms.Rooms;
            const userId = services.user.Info.Id;
            const userName = services.user.Info.Name;

            if (rooms) {
                const updatedRooms = rooms
                    .map(item => ({ ...item, owner: { id: userId, name: userName } }))
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setRooms(updatedRooms);
            }
        })
    , []);

    if (state === "pending") {
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        );
    }

    if (rooms.length === 0) {
        return (
            <div className={styles.store__empty__rooms}>
                Комнаты созданные вами будут храниться здесь.
            </div>
        )
    }

    return (
        <div className={styles.store}>
            <div className={styles.store__title}>Мои комнаты</div>

            <div className={styles.store__rooms}>
                { rooms.map(room => <RoomCard key={room.id} room={room} />) }
            </div>
        </div>
    )
});

export default Store;