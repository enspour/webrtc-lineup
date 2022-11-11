import React from "react";

import RoomLayout from "../../layouts/RoomLayout/RoomLayout";

import RoomCards from "../../ui/RoomCards/RoomCards";

const Room = () => (
    <RoomLayout>
        <RoomCards />
    </RoomLayout>
)

export default React.memo(Room);