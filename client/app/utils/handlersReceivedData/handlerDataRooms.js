const handlerDataRooms = data => {
    return data.body.rooms.map(item => ({
        ...item,
        modifiedAt: item.modified_at,
        createdAt: item.created_at,
    }))
}

export default handlerDataRooms;