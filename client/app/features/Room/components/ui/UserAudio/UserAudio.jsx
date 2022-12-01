import React from "react";

import styles from "./UserAudio.module.scss";

const UserAudio = ({ item }) => {
    const audioRef = React.useRef();

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.srcObject = item.stream;
        }
    }, [])

    return (
        <div
            className={styles.user__wrapper}
            style={{
                border: `.2rem solid ${
                    item.active 
                        ? "var(--theme-border-conf-user-active)" 
                        : "var(--theme-border-conf-user)"
                }`
            }}
        >
            <audio
                ref={audioRef}
                className={styles.audio}
                muted={item.muted} 
                autoPlay
            />

            <div className={styles.user__avatar}></div>
            <div className="h-100">
                <div className={styles.user__name}>Lineup user</div>
            </div>
        </div>
    )
}

export default React.memo(UserAudio);