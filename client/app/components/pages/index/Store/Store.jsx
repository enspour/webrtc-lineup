import React from "react";
import { observer } from "mobx-react-lite";

import StoredRoomCard from "@components/ui/StoredRoomCard/StoredRoomCard";

import services from "@services";

import styles from "./Store.module.scss";

const Store = observer(() => {
    const rooms = services.userRooms.Rooms;
    const state = services.userRooms.State;

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        services.userRooms.update();

        return () => services.userRooms.clear();
    }, []);

    React.useEffect(() => {
        if (rooms) {
            setItems([...rooms].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        }
    }, [rooms])

    if (state === "pending") {
        return (
            <div className={styles.loader}>
                <div className="loader"></div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.store__empty}>
                You don't have created room.
            </div>
        )
    }

    return (
        <div className={styles.store}>
            <div className={styles.title}>My rooms</div>

            <div className={styles.items}>
                { items.map(room => <StoredRoomCard key={room.id} room={room} />) }
            </div>
        </div>
    )
});

export default Store;