const transformToRoom = room => {
    return {
        id: room.id,
        name: room.name,
        owner: room.owner,
        settings: {
            visibility: room.settings.visibility
        },
        modifiedAt: room.modified_at,
        createdAt: room.created_at,
    }
}

export default transformToRoom;