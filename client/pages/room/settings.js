import React from "react";

import RoomLayout from "@components/layouts/RoomLayout/RoomLayout";

import RoomSettingsScreen from "@features/room/components/screens/RoomSettingsScreen/RoomSettingsScreen";

const Settings = () => (
    <RoomLayout title="Lineup | Settings">
        <RoomSettingsScreen />
    </RoomLayout>
);

export default React.memo(Settings);