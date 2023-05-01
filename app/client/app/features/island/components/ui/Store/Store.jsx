import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";
import Loader from "@components/ui/Loader/Loader";

import services from "@services";

import styles from "./Store.module.scss";

const Store = observer(() => {
    const state = services.userCreatedRooms.Status;

    const [items, setItems] = React.useState([]);

    React.useEffect(
        () =>
            autorun(() => {
                const rooms = services.userCreatedRooms.Array;
                const userId = services.user.Info.Id;
                const userName = services.user.Info.Name;

                if (rooms) {
                    setItems(
                        rooms
                            .map(item => ({ ...item, owner: { id: userId, name: userName } }))
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    );
                }
            })
        , []
    )

    if (state === "pending") {
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.store__empty}>
                Your rooms will be stored here.
            </div>
        )
    }

    return (
        <div className={styles.store}>
            <div className={styles.title}>My rooms</div>

            <div className={styles.items}>
                { items.map(room => <RoomCard key={room.id} room={room} />) }
            </div>
        </div>
    )
});

export default Store;