import React from "react";

import ConferenceLayout from "../../layouts/ConferenceLayout/ConferenceLayout";

import ConferenceVideos from "../../ui/ConferenceVideos/ConferenceVideos";

const ConferencePage = () => (
    <ConferenceLayout>
        <ConferenceVideos />
    </ConferenceLayout>
)

export default React.memo(ConferencePage);