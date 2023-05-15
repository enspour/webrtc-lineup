import { memo } from 'react'

import styles from "./ConferenceChat.module.scss"

const ConferenceChatHeader = () => {
    return (
        <div className={styles.chat__header}>Чат конференции</div>
    )
}

export default memo(ConferenceChatHeader);