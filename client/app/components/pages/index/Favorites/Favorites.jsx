import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";

import services from "@services";

import styles from "./Favorites.module.scss";

const Favorites = observer(() => {
    const state = services.favoritesRooms.State;

    const [items, setItems] = React.useState([]);

    React.useEffect(
        () =>
            autorun(() => {
                const rooms = services.favoritesRooms.Rooms;

                if (rooms) {
                    setItems([...rooms]);
                }
            })
        , []
    )

    if (state === "pending") {
        return (
            <div className={styles.loader}>
                <div className="loader"></div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.favorites__empty}>
                Your favorite rooms will be stored here.
            </div>
        )
    }

    return (
        <div className={styles.favorites}>
            <div className={styles.title}>Favorites rooms</div>

            <div className={styles.items}>
                { items.map(room => <RoomCard key={room.id} room={room} />) }
            </div>
        </div>
    )
});

export default Favorites;