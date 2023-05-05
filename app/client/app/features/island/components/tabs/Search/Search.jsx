import { useEffect } from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

import RoomCard from "@components/ui/RoomCard/RoomCard";
import Loader from "@components/ui/Loader/Loader";

import services from "@services";

import styles from "./Search.module.scss";

const Search = observer(() => {
    const text = services.island.Search.Text;
    const state = services.island.Search.Status;
    const rooms = services.island.Search.Rooms;

    const runExample = () => services.island.Search.Text = "#lineup Lineup";

    useEffect(() => {
        return () => services.island.Search.clear();
    }, []);

    useEffect(() => 
        autorun(() => {
            const text = services.island.Search.Text;
            if (text) {
                services.island.Search.update();
            } else {
                services.island.Search.clear();
            }
        })
    , [])

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
                    <span className={styles.search__example} onClick={runExample}>#lineup Lineup</span>
                </div>
            </div>
        )
    }

    if (rooms.length === 0) {
        return (
            <div className={styles.rooms__empty}>
                Sorry, the room could not be found, it may be hidden.
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