import React from "react";
import { observer } from "mobx-react-lite";

import styles from "./UserVideo.module.scss";

const UserVideo = observer(({ item, options }) => {
    const videoRef = React.useRef();

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = item.stream;
        }
    }, [])

    return (
        <div 
            className={styles.wrapper}
            style={{
                border: `.2rem solid ${
                    item.active 
                        ? "var(--theme-border-conf-video-active)" 
                        : "var(--theme-border-conf-video)"
                }`
            }}
        >
            <video 
                ref={videoRef}
                className={styles.video}
                style={{
                    height: `${options.height}px`,
                    width: `${options.width}px`,
                }}
                muted={item.muted} 
                autoPlay
            />
        </div>
    )
})

export default UserVideo;