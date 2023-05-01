import React from "react";
import Head from "next/head";

import ConnectionLayout from "../../layouts/ConnectionLayout/ConnectionLayout";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import CreateConferenceModal from "../../modals/CreateConferenceModal/CreateConferenceModal";
import BrowseRoomSettingsModal from "../../modals/BrowseRoomSettingsModal/BrowseRoomSettingsModal";
import BrowseConferenceSettingsModal from "../../modals/BrowseConferenceSettingsModal/BrowseConferenceSettingsModal";

import styles from "./RoomLayout.module.scss"

const RoomLayout = ({ title = "Lineup | Room", children }) => {
    return (
        <ConnectionLayout>
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <Header />
                
                <div className={styles.room__content}>
                    { children }
                </div>

                <Footer />

                <CreateConferenceModal />
                <BrowseConferenceSettingsModal />
                <BrowseRoomSettingsModal />
            </div>
        </ConnectionLayout>
    )
}

export default React.memo(RoomLayout);