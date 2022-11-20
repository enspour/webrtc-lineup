import React from "react";
import Head from "next/head";

import ConnectionLayout from "@features/room/components/layouts/ConnectionLayout/ConnectionLayout";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import styles from "./RoomLayout.module.scss"
import CreateConferenceModal from "../../modals/CreateConferenceModal/CreateConferenceModal";

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
            </div>
        </ConnectionLayout>
    )
}

export default React.memo(RoomLayout);