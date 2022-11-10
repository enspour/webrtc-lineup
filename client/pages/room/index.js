import React from "react";
import { useRouter } from "next/router";

import RoomLayout from "@components/layouts/RoomLayout/RoomLayout";

import { RoomCardsScreen } from "@features/room";

import services from "@services";

const Room = () => {
    const router = useRouter();

    React.useEffect(() => {
        if (!services.room.Connected) {
            router.push("/");
        }
    }, [])
   
    if (!services.room.Connected) {
        return (
            <div className="h-100vh w-100 fl al-center jf-center">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <RoomLayout>
            <div className="mt-4">
                <RoomCardsScreen />
            </div>
        </RoomLayout>
    )
}

export default React.memo(Room);