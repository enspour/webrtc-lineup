import React from "react";
import Head from "next/head";

import ConnectionLayout from "@features/room/components/layouts/ConnectionLayout/ConnectionLayout";
import Header from "./Header/Header";

import styles from "./ConferenceLayout.module.scss";

const ConferenceLayout = ({ children }) => {
    return (
        <ConnectionLayout>
            <div>
                <Head>
                    <title>Lineup | Conference</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <Header />

                <div className={styles.conference__content}>
                    { children }
                </div>
            </div>
        </ConnectionLayout>
    )
}

export default React.memo(ConferenceLayout);