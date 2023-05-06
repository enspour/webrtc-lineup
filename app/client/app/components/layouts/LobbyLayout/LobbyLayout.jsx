import { memo } from "react";
import Head from "next/head";

import Header from "./Header/Header";

import CreateRoomModal from "@components/modals/CreateRoomModal/CreateRoomModal";
import BrowseRoomModal from "@components/modals/BrowseRoomModal/BrowseRoomModal";

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
            <BrowseRoomModal />
        </main>
    )
}

export default memo(LobbyLayout);