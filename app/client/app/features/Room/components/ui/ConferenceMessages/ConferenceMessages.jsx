import React from "react";
import { observer } from "mobx-react-lite";

import styles from "./ConferenceMessages.module.scss";

import useScrollDownAtOpening from "../../../hooks/useScrollDownAtOpening";
import useWatchScroll from "../../../hooks/useWatchScroll";

import services from "@services";

const checkTime = (message, previousMessage) => {
    const createdAt = new Date(message.createdAt);
    const previousCreatedAt = new Date(previousMessage.createdAt);

    const minute = 1000 * 60

    return (createdAt - previousCreatedAt) <= minute;
}

const isHide = (index) => {
    const messages = services.conference.Messages;

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
    return owner.id === services.user.Id;
}

const OwnerAvatar = ({ owner, hide }) => {
    if (hide) {
        return <div className={styles.owner__avatar__hide}></div>
    }

    return <div className={styles.owner__avatar}></div>
}

const OwnerName = ({ owner, hide }) => {
    if (hide) {
        return <div></div>
    }

    if (isOwner(owner)) {
        return <div className={styles.owner__name}>You</div>
    }

    return <div className={styles.owner__name}>{owner.name}</div>
}

const SendingTime = ({ message, hide }) => {
    const createdAt = new Date(message.createdAt);
    const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    if (hide || isNaN(createdAt.getTime())) {
        return "";
    }

    return <div className={styles.message__sending__time}> {time} </div>
}

const Message = React.memo(({ message, index }) => {
    const _isHide = isHide(index);
    const _isOwner = isOwner(message.owner);

    return (
        <div 
            className={styles.container}
            style={{
                marginTop: _isHide ? "0" : "2rem",
                flexDirection: _isOwner ? "row-reverse" : "row",
            }}
        >
            <OwnerAvatar owner={message.owner} hide={_isHide}/>

            <div 
                className={styles.wrapper}
                style={{
                    alignItems: _isOwner ? "flex-end" : "flex-start"
                }}
            >
                <div 
                    className={styles.message__top__panel}
                    style={{
                        padding: _isHide ? "0" : ".5rem"
                    }}    
                >
                    <OwnerName owner={message.owner} hide={_isHide}/>
                    <SendingTime message={message} hide={_isHide}/>
                </div>

                <div className={styles.message}>
                    {message.text}
                </div>
            </div>
        </div>
    )
})

const ConferenceMessages = observer(() => {
    const messages = services.conference.Messages;
    
    const messagesRef = React.useRef();

    useScrollDownAtOpening(messagesRef);
    useWatchScroll(messagesRef);

    return (
        <div ref={messagesRef} className={styles.messages}>
            { 
                messages.map((message, index) => 
                    <Message key={message.id} message={message} index={index}/>
                )
            }
        </div>
    )
});

export default ConferenceMessages;