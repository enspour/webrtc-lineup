import { useState, memo } from 'react'

import MessageBox from '../../ui/MessageBox/MessageBox';

import services from "@services";

const ConferenceChatMessageBox = () => {
    const [text, setText] = useState("");

    const sendMessage = async () => {
        if (text) { 
            services.conference.Chat.sendMessage(text);
        }
    }

    return (
        <MessageBox setMessage={setText} send={sendMessage} />
    )
}

export default memo(ConferenceChatMessageBox);