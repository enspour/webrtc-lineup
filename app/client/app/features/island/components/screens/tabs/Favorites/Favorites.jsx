import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";
import Loader from "@components/ui/Loader/Loader";

import services from "@services";

import styles from "./Favorites.module.scss";

const Favorites = observer(() => {
    const rooms = services.user.FavoritesRooms.Rooms;
    const state = services.user.FavoritesRooms.Status;

    if (state === "pending") {
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        );
    }

    if (rooms.length === 0) {
        return (
            <div className={styles.favorites__empty__rooms}>
                Избранные комнаты будут храниться здесь.
            </div>
        )
    }

    return (
        <div className={styles.favorites}>
            <div className={styles.favorites__title}>Избранные комнаты</div>

            <div className={styles.favorites__rooms}>
                { rooms.map(room => <RoomCard key={room.id} room={room} />) }
            </div>
        </div>
    )
});

export default Favorites;