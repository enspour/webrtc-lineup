import React from "react";

import RoomLayout from "@components/layouts/RoomLayout/RoomLayout";

import { RoomCardsScreen } from "@features/room";

const Room = () => (
    <RoomLayout>
        <RoomCardsScreen />
    </RoomLayout>
)

export default React.memo(Room);