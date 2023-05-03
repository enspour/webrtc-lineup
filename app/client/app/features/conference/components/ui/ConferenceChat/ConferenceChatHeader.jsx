import { memo } from 'react'

import styles from "./ConferenceChat.module.scss"

const ConferenceChatHeader = () => {
    return (
        <div className={styles.chat__header}>Chatting</div>
    )
}

export default memo(ConferenceChatHeader);