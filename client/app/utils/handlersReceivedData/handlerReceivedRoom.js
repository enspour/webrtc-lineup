import handlerReceivedRoomSettings from "./handlerReceivedRoomSettings";

const handlerReceivedRoom = room => {
    return {
        id: room.id,
        name: room.name,
        owner: room.owner,
        settings: handlerReceivedRoomSettings(room.settings),
        createdAt: room.created_at,
    }
}

export default handlerReceivedRoom;