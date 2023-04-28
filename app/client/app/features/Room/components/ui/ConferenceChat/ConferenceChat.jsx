import React from "react";

import Panel from "@components/ui/Panel/Panel";

import MessageBox from "../MessageBox/MessageBox";
import ConferenceMessages from "../ConferenceMessages/ConferenceMessages";

import services from "@services";

import styles from "./ConferenceChat.module.scss";

const ChatHeader = () => {
    return (
        <div className={styles.chat__header}>
            
        </div>
    )
}

const ConferenceChat = () => {
    const [text, setText] = React.useState("");

    const send = async () => {
        if (text) { 
            services.conference.sendMessage(text);
        }
    }

    return (
        <div className={styles.container}>
            <Panel height="calc(100vh - 5rem - 4rem)">
                <div className={styles.chat}>
                    <ChatHeader />

                    <div className={styles.chat__content}>
                        <ConferenceMessages />
                        <MessageBox setMessage={setText} send={send} />
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default React.memo(ConferenceChat);