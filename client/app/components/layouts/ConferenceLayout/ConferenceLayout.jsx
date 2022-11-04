import React from "react";
import Head from "next/head";

import { ConferencePanel } from "@features/room";

import styles from "./ConferenceLayout.module.scss";

const ConferenceLayout = ({ children }) => {
    return (
        <div className={styles.conference}>
            <Head>
                <title>Lineup | Conference</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <ConferencePanel />

            <div className={styles.conference__content}>
                { children }
            </div>
        </div>
    )
}

export default React.memo(ConferenceLayout);