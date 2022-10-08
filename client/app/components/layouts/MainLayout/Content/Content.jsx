import React from "react"

import AddRoomModal from "@components/modals/AddRoomModal/AddRoomModal";

import styles from "./Content.module.scss";

const Content = ({ children }) => {
    return (
        <>
            <div className={styles.content}> {children} </div>
            
            <AddRoomModal />
        </>
    );
}

export default React.memo(Content);