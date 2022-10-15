interface JoinPayload {
    id: string
    password: string
}

interface LeavePayload {
    id: string
}

export const onJoinRoom = (payload: JoinPayload) => {
    if (payload
        && "id" in payload 
        && "password" in payload
        && typeof payload.id === "string"
        && typeof payload.password === "string"
    ) {
        const { id, password } = payload;
        
    }
}

export const onLeaveRoom = (payload: LeavePayload) => {
    if (
        payload
        && "id" in payload
        && typeof payload.id === "string"
    ) {
        const { id } = payload;
        
    }
}