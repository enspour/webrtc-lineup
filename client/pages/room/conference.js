import React from "react";
import { useRouter } from "next/router";

import ConferenceLayout from "@components/layouts/ConferenceLayout/ConferenceLayout";

import VideosConferenceScreen from "@features/room/components/screens/VideosConferenceScreen/VideosConferenceScreen";

import services from "@services";

const Conference = () => {
    const router = useRouter();

    React.useEffect(() => {
        if (!services.room.Connected) {
            router.push("/");
        }
    }, [])

    return (
        <ConferenceLayout>
            <VideosConferenceScreen />
        </ConferenceLayout>
    )
}

export default React.memo(Conference);