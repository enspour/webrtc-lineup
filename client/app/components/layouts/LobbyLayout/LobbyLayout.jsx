import React from "react";
import Head from "next/head";

import Header from "./Header/Header";

import CreateRoomModal from "@components/modals/CreateRoomModal/CreateRoomModal";
import RoomModal from "@components/modals/RoomModal/RoomModal";

import styles from "./LobbyLayout.module.scss";

const LobbyLayout = ({ children, title = "Lineup" }) => {
    return (
        <main className={styles.main}>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />

            <div className={styles.content}> {children} </div>

            <CreateRoomModal />
            <RoomModal />
        </main>
    )
}

export default React.memo(LobbyLayout);