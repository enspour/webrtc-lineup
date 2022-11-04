import React from "react";
import { useRouter } from "next/router";

import RoomLayout from "@components/layouts/RoomLayout/RoomLayout";

import { RoomCardsScreen } from "@features/room";

import services from "@services";

import styles from "@styles/pages/room.module.scss";

const Room = () => {
    const router = useRouter();

    React.useEffect(() => {
        if (!services.room.Connected) {
            router.push("/");
        }
    }, [])
   
    return (
        <RoomLayout>
            <div className={styles.room__cards}>
                <RoomCardsScreen />
            </div>
        </RoomLayout>
    )
}

export default React.memo(Room);