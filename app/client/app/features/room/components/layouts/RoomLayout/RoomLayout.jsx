import { memo } from "react";
import Head from "next/head";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import CreateConferenceModal from "../../modals/CreateConferenceModal/CreateConferenceModal";
import BrowseRoomSettingsModal from "../../modals/BrowseRoomSettingsModal/BrowseRoomSettingsModal";
import BrowseConferenceSettingsModal from "../../modals/BrowseConferenceSettingsModal/BrowseConferenceSettingsModal";

import styles from "./RoomLayout.module.scss"

const RoomLayout = ({ title = "Lineup | Room", children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />
            
            <div className={styles.room__content}>
                { children }
            </div>

            <div className={styles.room__footer}>
                <Footer />
            </div>

            <CreateConferenceModal />
            <BrowseConferenceSettingsModal />
            <BrowseRoomSettingsModal />
        </div>
    );
}

export default memo(RoomLayout);