const transformToRooms = rooms => {
    return rooms.map(item => ({
        ...item,
        modifiedAt: item.modified_at,
        createdAt: item.created_at,
    }))
}

export default transformToRooms;