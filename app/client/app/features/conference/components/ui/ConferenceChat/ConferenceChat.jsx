import { memo } from "react";

import Panel from "@components/ui/Panel/Panel";

import ConferenceChatMessageBox from "./ConferenceChatMessageBox";
import ConferenceChatMessages from "./ConferenceChatMessages";
import ConferenceChatHeader from "./ConferenceChatHeader";

import styles from "./ConferenceChat.module.scss";

const ConferenceChat = () => {
    return (
        <div className={styles.container}>
            <Panel height="calc(100vh - 5rem - 4rem)">
                <div className={styles.chat}>
                    <ConferenceChatHeader />

                    <div className={styles.chat__content}>
                        <ConferenceChatMessages />
                        <ConferenceChatMessageBox />
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default memo(ConferenceChat);