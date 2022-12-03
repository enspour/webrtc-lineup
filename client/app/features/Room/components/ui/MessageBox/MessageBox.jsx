import React from "react"

import Svg from "@components/ui/Svg/Svg";

import AddFolderIcon from "@assets/images/chat/add-folder.svg";
import SendIcon from "@assets/images/chat/send.svg";

import styles from "./MessageBox.module.scss";

const MessageBox = ({ setMessage, send }) => {
    const messageInputRef = React.useRef();
    
    const clear = () => {
        const messageInput = messageInputRef.current;
        if (messageInput) {
            messageInput.innerText = "";
            setMessage("");
        }
    }

    const handleChangeText = e => {
        const text = e.target.innerText;
        setMessage(text);
    }

    const handleClickSend = () => {
        send();
        clear();
    }

    React.useEffect(() => {
        const messageInput = messageInputRef.current;

        if (messageInput) {
            const event = e => {
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain');
                document.execCommand("insertText", false, text);
            }
            
            messageInput.addEventListener("paste", event);
            return () => messageInput.removeEventListener("paste", event);
        }
    })

    return (
        <div className={styles.message__box}>
            <Svg 
                url={AddFolderIcon}
                width="1.8"
                height="1.8"
            />
            
            <div 
                ref={messageInputRef}
                className={styles.message__box__input} 
                onInput={handleChangeText}
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