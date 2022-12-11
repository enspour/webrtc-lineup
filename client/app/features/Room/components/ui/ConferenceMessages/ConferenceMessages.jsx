import React from "react";
import { observer } from "mobx-react-lite";

import styles from "./ConferenceMessages.module.scss";

import services from "@services";
import useChildrenObserver from "@hooks/useChildrenObserver";

const checkTime = (message, previosMessage) => {
    const createdAt = new Date(message.createdAt);
    const previosCreatedAt = new Date(previosMessage.createdAt);

    const minute = 1000 * 60

    return (createdAt - previosCreatedAt) <= minute;
}

const isHide = (index) => {
    const messages = services.conference.Messages;

    if (0 < index && index < messages.length) {
        const message = messages[index];
        const previosMessage = messages[index - 1];

        if (
            previosMessage.owner.id === message.owner.id
            && checkTime(message, previosMessage) 
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

    useScrollAtOpening(messagesRef);
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

function useScrollAtOpening(ref) {
    const scroll = (target, unsubscribe) => {
        unsubscribe();

        target.scrollTo({
            top: target.scrollHeight,
        })
    }

    const { subscribe, unsubscribe } = useChildrenObserver(ref, scroll);

    React.useEffect(() => {
        const target = ref.current;

        if (target) {
            target.scrollTo({
                top: target.scrollHeight,
            });

            unsubscribe();
        }

        subscribe();
        return () => unsubscribe();
    }, []);
}

function useWatchScroll(ref) {
    const scroll = (target) => {
        target.scrollTo({
            top: target.scrollHeight,
            behavior: "smooth"    
        })
    }

    const { subscribe, unsubscribe } = useChildrenObserver(ref, scroll);

    React.useEffect(() => {
        const current = ref.current;
        if (current) {
            const event = (e) => {
                const target = e.target;
                if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
                    subscribe();
                } else {
                    unsubscribe();
                }
            }

            current.addEventListener("scroll", event);

            return () => {
                unsubscribe();
                current?.removeEventListener("scroll", event);
            }
        }
    }, []);
}


export default ConferenceMessages;