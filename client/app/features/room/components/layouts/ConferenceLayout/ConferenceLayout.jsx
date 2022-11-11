import React from "react";
import Head from "next/head";

import RedirectDisconnectedUser from "@features/room/components/ui/RedirectDisconnectedUser/RedirectDisconnectedUser";
import ConferencePanel from "@features/room/components/ui/ConferencePanel/ConferencePanel";

import styles from "./ConferenceLayout.module.scss";

const ConferenceLayout = ({ children }) => {
    return (
        <RedirectDisconnectedUser>
            <div>
                <Head>
                    <title>Lineup | Conference</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <ConferencePanel />

                <div className={styles.conference__content}>
                    { children }
                </div>
            </div>
        </RedirectDisconnectedUser>
    )
}

export default React.memo(ConferenceLayout);