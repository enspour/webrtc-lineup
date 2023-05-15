import { memo } from "react";

import services from "@services";

import styles from "./ConferenceChat.module.scss";

const checkTime = (message, previousMessage) => {
    const createdAt = new Date(message.createdAt);
    const previousCreatedAt = new Date(previousMessage.createdAt);

    const minute = 1000 * 60

    return (createdAt - previousCreatedAt) <= minute;
}

const isHide = (index) => {
    const messages = services.conference.Chat.Messages;

    if (0 < index && index < messages.length) {
        const message = messages[index];
        const previousMessage = messages[index - 1];

        if (
            previousMessage.owner.id === message.owner.id
            && checkTime(message, previousMessage) 
        ) {
            return true;
        }
    }

    if (index === 0) {
        return false;
    }
}

const isOwner = (owner) => {
    return owner.id === services.user.Info.Id;
}

const OwnerAvatar = ({ owner, hide }) => {
    if (hide) {
        return <div className={styles.chat__message__owner__avatar__hide}></div>
    }

    return <div className={styles.chat__message__owner__avatar}></div>
}

const OwnerName = ({ owner, hide }) => {
    if (hide) {
        return <div></div>
    }

    if (isOwner(owner)) {
        return <div className={styles.chat__message__owner__name}>Вы</div>
    }

    return <div className={styles.chat__message__owner__name}>{owner.name}</div>
}

const SendingTime = ({ message, hide }) => {
    const createdAt = new Date(message.createdAt);
    const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    if (hide || isNaN(createdAt.getTime())) {
        return "";
    }

    return <div className={styles.chat__message__sending__time}> {time} </div>
}

const ConferenceChatMessage = ({ message, index }) => {
    const hide = isHide(index);
    const owner = isOwner(message.owner);

    return (
        <div 
            className={styles.chat__message__container}
            style={{
                marginTop: hide ? "0" : "2rem",
                flexDirection: owner ? "row-reverse" : "row",
            }}
        >
            <OwnerAvatar owner={message.owner} hide={hide}/>

            <div 
                className={styles.chat__message__wrapper}
                style={{
                    alignItems: owner ? "flex-end" : "flex-start"
                }}
            >
                <div 
                    className={styles.chat__message__header}
                    style={{
                        padding: hide ? "0" : ".5rem"
                    }}    
                >
                    <OwnerName owner={message.owner} hide={hide}/>
                    <SendingTime message={message} hide={hide}/>
                </div>

                <div className={styles.chat__message}>
                    {message.text}
                </div>
            </div>
        </div>
    )
}

export default memo(ConferenceChatMessage);