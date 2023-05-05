import { useRef, useState, useEffect, memo } from "react";

import UserAPI from "@api/UserAPI";

import useRequest from "@hooks/api/useRequest";
import useResponse from "@hooks/api/useResponse";

import styles from "./UserAudio.module.scss";

const UserAudio = ({ item }) => {
    const audioRef = useRef();

    const [user, setUser] = useState({});

    const request = useRequest(UserAPI.findOne);
    const { data } = useResponse(request);
    
    useEffect(() => {
        request.start({ params: { id: item.userId } })
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.srcObject = item.stream;
        }
    }, [])

    useEffect(() => {
        if (data) setUser(data.body.user);
    }, [data])

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

export default memo(UserAudio);