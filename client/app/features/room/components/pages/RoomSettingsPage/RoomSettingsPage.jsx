import React from "react";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import RoomSettings from "../../ui/RoomSettings/RoomSettings";

const Settings = () => (
    <RoomLayout title="Lineup | Settings">
        <RoomSettings />
    </RoomLayout>
);

export default React.memo(Settings);