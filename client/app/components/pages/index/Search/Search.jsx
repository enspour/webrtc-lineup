import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";

import services from "@services";

import styles from "./Search.module.scss";

const Search = observer(() => {
    const rooms = services.search.Rooms;

    React.useEffect(() => {
        return () => services.search.clear();
    }, []);

    React.useEffect(() => 
            autorun(() => {
                const searchedText = services.search.SearchedText;
                if (searchedText) {
                    services.search.update();
                } else {
                    services.search.clear();
                }
            })
        , []
    )

    return (
        <div className={styles.search}>
            <div className={styles.items}>
                { rooms.map(room => <RoomCard key={room.id} room={room}/>) }
            </div>
        </div>
    )
});

export default Search;