import React from "react"

import AddRoomModal from "@components/modals/AddRoomModal/AddRoomModal";
import RoomModal from "@components/modals/RoomModal/RoomModal";

import styles from "./Content.module.scss";

const Content = ({ children }) => {
    return (
        <>
            <div className={styles.content}> {children} </div>
            
            <AddRoomModal />
            <RoomModal />
        </>
    );
}

export default React.memo(Content);