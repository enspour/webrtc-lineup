import { useRef, useEffect, memo } from "react";

import styles from "./UserVideo.module.scss";

const UserVideo = ({ item, options }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = item.stream;
        }
    }, [])

    return (
        <div 
            className={styles.container}
            style={{
                border: `.2rem solid ${
                    item.active 
                        ? "var(--theme-border-conf-user-active)" 
                        : "var(--theme-border-conf-user)"
                }`
            }}
        >
            <video 
                ref={videoRef}
                className={styles.user__video}
                style={{
                    height: `${options.height}px`,
                    width: `${options.width}px`,
                }}
                muted={item.muted} 
                autoPlay
            />
        </div>
    )
}

export default memo(UserVideo);