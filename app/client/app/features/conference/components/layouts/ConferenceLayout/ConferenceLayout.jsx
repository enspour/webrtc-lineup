import { memo } from "react";
import Head from "next/head";

import Header from "./Header/Header";

import styles from "./ConferenceLayout.module.scss";

const ConferenceLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Lineup | Conference</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />

            <div className={styles.content}>
                { children }
            </div>
        </div>
    );
}

export default memo(ConferenceLayout);