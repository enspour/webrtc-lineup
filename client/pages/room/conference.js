import React from "react";

import ConferenceLayout from "@components/layouts/ConferenceLayout/ConferenceLayout";

import ConferenceVideosScreen from "@features/room/components/screens/ConferenceVideosScreen/ConferenceVideosScreen";

const Conference = () => (
    <ConferenceLayout>
        <ConferenceVideosScreen />
    </ConferenceLayout>
);

export default React.memo(Conference);