import React from "react"

import CreateRoomModal from "@components/modals/CreateRoomModal/CreateRoomModal";
import RoomModal from "@components/modals/RoomModal/RoomModal";

import styles from "./Content.module.scss";

const Content = ({ children }) => {
    return (
        <>
            <div className={styles.content}> {children} </div>
            
            <CreateRoomModal />
            <RoomModal />
        </>
    );
}

export default React.memo(Content);