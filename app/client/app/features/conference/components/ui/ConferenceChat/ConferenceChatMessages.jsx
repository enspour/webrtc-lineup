import { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Loader from "@components/ui/Loader/Loader";
import ConferenceChatMessage from "./ConferenceChatMessage";

import useMessagesFollower from "../../../hooks/useMessagesFollower";
import useScrollDownAtOpening from "../../../hooks/useScrollDownAtOpening";

import services from "@services";

import styles from "./ConferenceChat.module.scss";

const Messages = observer(() => {
    const messages = services.conference.Chat.Messages;

    const messagesRef = useRef();

    useScrollDownAtOpening(messagesRef);
    useMessagesFollower(messagesRef);

    return (
        <div ref={messagesRef} className={styles.chat__messages}>
            {
                messages.map((message, index) => 
                    <ConferenceChatMessage 
                        key={message.id} 
                        message={message} 
                        index={index}
                    />
                )
            }
        </div>
    )
});

const ConferenceChatMessages = observer(() => {
    const status = services.conference.Chat.Status;
    
    useEffect(() => {
        services.conference.Chat.update();
    }, []);

    if (status === "pending") {
        return <Loader /> 
    }

    if (status === "done") {
        return <Messages />
    }

    return null;
});

export default ConferenceChatMessages;