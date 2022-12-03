import React from "react";

import Panel from "@components/ui/Panel/Panel";

import MessageBox from "../MessageBox/MessageBox";

import services from "@services";

import styles from "./ConferenceChat.module.scss";

const Message = ({ message }) => {
    const time = new Date(message.modifiedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    return (
        <div 
            className={styles.chat__message}
            style={{
                alignSelf: services.user.Id === message.user.id ? "flex-end" : "flex-start",
                flexDirection: services.user.Id === message.user.id ? "row" : "row-reverse",
            }}
        >
            <div>
                <div 
                    className={styles.chat__message__text}
                    style={{
                        borderBottomRightRadius: services.user.Id === message.user.id ? "0" : "2rem",
                        borderBottomLeftRadius: services.user.Id !== message.user.id ? "0" : "2rem"
                    }}
                >
                    {message.text}
                </div>
                    
                <div 
                    className={styles.chat__message__time}
                    style={{
                        textAlign: services.user.Id === message.user.id ? "right" : "left",
                    }}
                > 
                    {time} 
                </div>
            </div>

            <div className={styles.chat__message__user__avatar}></div>
        </div>
    )
}

const Messages = ({ messages }) => {
    return (
        <div className={styles.chat__messages}>
            { messages.map(msg => <Message key={msg.id} message={msg}/>) }
        </div>
    )
}

const ConferenceChat = () => {
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);

    const send = () => {
        if (message.trim()) {
            const user = {
                id: services.user.Id,
                name: services.user.Name
            }

            const msg = { 
                id: messages.length, 
                text: message, 
                user,
                createdAt: Date.now(),
                modifiedAt: Date.now() 
            }

            setMessages([...messages, msg])
        }
    }

    React.useEffect(() => {
        console.log(message);
    }, [message])

    return (
        <div className={styles.container}>
            <Panel height="calc(100vh - 5rem - 4rem)">
                <div className={styles.chat}>
                    <Messages messages={messages}/>
                    <MessageBox setMessage={setMessage} send={send}/>
                </div>
            </Panel>
        </div>
    )
}

export default React.memo(ConferenceChat);