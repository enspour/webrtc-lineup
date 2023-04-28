const handlerMessage = message => {
    return {
        id: message.id,
        text: message.text,
        owner: message.owner,
        modifiedAt: message.modified_at,
        createdAt: message.created_at,
    }
}

export default handlerMessage;