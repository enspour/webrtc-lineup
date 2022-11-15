const handlerRecievedRooms = rooms => {
    return rooms.map(item => ({
        ...item,
        createdAt: item.created_at,
    }))
}

export default handlerRecievedRooms;