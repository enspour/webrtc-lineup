import React from "react";
import { useRouter } from "next/router";

import ConferenceLayout from "@components/layouts/ConferenceLayout/ConferenceLayout";

import ConferenceVideosScreen from "@features/room/components/screens/ConferenceVideosScreen/ConferenceVideosScreen";

import services from "@services";

const Conference = () => {
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
        <ConferenceLayout>
            <ConferenceVideosScreen />
        </ConferenceLayout>
    )
}

export default React.memo(Conference);