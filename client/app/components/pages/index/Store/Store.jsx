import React from "react";
import { observer } from "mobx-react-lite";

import StoredRoom from "@components/ui/StoredRoom/StoredRoom";

import services from "@services";

import styles from "./Store.module.scss";

const Store = observer(() => {
    const rooms = services.userRooms.Rooms;
    const state = services.userRooms.State;

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        services.userRooms.update();
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

    return (
        <div className={styles.store}>
            <div className={styles.title}>My rooms</div>

            <div className={styles.items}>
                { items.map(room => <StoredRoom key={room.id} room={room} />) }
            </div>
        </div>
    )
});

export default Store;