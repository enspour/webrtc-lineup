import React from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";
import Loader from "@components/ui/Loader/Loader";

import services from "@services";

import styles from "./Search.module.scss";

const Search = observer(() => {
    const text = services.search.SearchedText;
    const state = services.search.Status;
    const rooms = services.search.Rooms;

    const runExample = () => services.search.SearchedText = "#example #lineup Lineup"

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

    if (state === "pending") {
        return (
            <div className={styles.loader}>
                <Loader />
            </div>
        )
    }

    if (!text) {
        return (
            <div className={styles.search__empty}>
                <div>Type in some text to find rooms. You can also use tags for a more precise search.</div>
                <div>
                    <span>Example:&nbsp;</span> 
                    <span className={styles.search__example} onClick={runExample}>#example #lineup Lineup</span>
                </div>
            </div>
        )
    }

    if (rooms.length === 0) {
        return (
            <div className={styles.rooms__empty}>
                Sorry. Couldn't find a room.
            </div>
        )
    }

    return (
        <div className={styles.search}>
            <div className={styles.items}>
                { rooms.map(room => <RoomCard key={room.id} room={room}/>) }
            </div>
        </div>
    )
});

export default Search;