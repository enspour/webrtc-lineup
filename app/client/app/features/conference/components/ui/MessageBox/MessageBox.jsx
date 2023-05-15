import React from "react"

import Svg from "@components/ui/Svg/Svg";

import AttachIcon from "@assets/images/chat/attach.svg";
import SendIcon from "@assets/images/chat/send.svg";

import styles from "./MessageBox.module.scss";

const MessageBox = ({ setMessage, send }) => {
    const messageInputRef = React.useRef();

    const handleChangeText = () => {
        const messageInput = messageInputRef.current;

        if (messageInput) {
            setMessage(messageInput.innerText.trim());
        }
    }

    const handleClickSend = () => {
        const messageInput = messageInputRef.current;
        
        if (messageInput) {
            send();

            messageInput.innerText = "";
            setMessage("");
        }
    }

    React.useEffect(() => {
        const messageInput = messageInputRef.current;

        if (messageInput) {
            const event = e => {
                e.preventDefault();

                const text = e.clipboardData.getData('text/plain');
                const message = text.trim();

                if (message) {
                    document.execCommand("insertText", false, text);
                }
            }
            
            messageInput.addEventListener("paste", event);
            return () => messageInput.removeEventListener("paste", event);
        }
    })

    return (
        <div className={styles.wrapper}>
            <Svg 
                url={AttachIcon}
                width="1.5"
                height="1.5"
            />
            
            <div 
                ref={messageInputRef}
                className={styles.input} 
                onInput={handleChangeText}
                data-placeholder="Введите сообщение"
                contentEditable
            />

            <Svg 
                url={SendIcon}
                width="1.8"
                height="1.8"
                onClick={handleClickSend}
            />
        </div>
    )
}

export default React.memo(MessageBox)