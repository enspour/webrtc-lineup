import React from "react";
import Head from "next/head";

import Panel from "@components/ui/Panel/Panel";

import styles from "./LoginLayout.module.scss";

const LoginLayout = ({ title = "Lineup", children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <main className={styles.main}>
                <div className={styles.container}>
                    <Panel>
                        { children }
                    </Panel>
                </div>
            </main>
        </div>
    )
}

export default React.memo(LoginLayout);