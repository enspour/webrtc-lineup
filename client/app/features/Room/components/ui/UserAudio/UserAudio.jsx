import React from "react";

import UserAPI from "@api/UserAPI";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import styles from "./UserAudio.module.scss";

const UserAudio = ({ item }) => {
    const audioRef = React.useRef();

    const [user, setUser] = React.useState({});

    const request = useRequest(UserAPI.findOne);
    const { data } = useResponse(request);
    
    React.useEffect(() => {
        request.start({ params: { id: item.userId } })
    }, []);

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.srcObject = item.stream;
        }
    }, [])

    React.useEffect(() => {
        if (data) setUser(data.body.user);
    }, [data])

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
            <div className={styles.user__name}> {user.name} </div>
        </div>
    )
}

export default React.memo(UserAudio);