import { Actions } from "..";

import { ActionContext } from "@socket/services/Actions.service";

import RoomsService from "@services/Rooms.service";

import services from "@socket/services";

export interface JoinPayload {
    id: string
    password: string
}

export interface IdPayload {
    id: string
}

class RoomsActions { 
    async join(context: ActionContext<JoinPayload>) {
        const { id, password } = context.Payload;

        const room = await RoomsService.findRoomWithSettingsById(BigInt(id));

        if (!room) {
            return context.badRequest(Actions.NOTIFY_JOIN, "Room is not found");
        }

        if (room.settings.password !== password) {
            return context.badRequest(Actions.NOTIFY_JOIN, "Incorrect password");
        }
        
        if (context.Client.CountRooms === 1) {
            await context.Client.join(id);
    
            const data = {
                id: room.id.toString(),
                name: room.name,
                status: room.status,
                owner_id: room.owner_id.toString(),
                created_at: room.created_at,
            };
            
            context.success(Actions.NOTIFY_JOIN, "Success join", data);
            return context.broadcast(id, Actions.NOTIFY_USER_JOIN, { socketId: context.Client.SocketId })
        } else {
            return context.success(Actions.NOTIFY_JOIN, "Already connected")
        }
    }

    leave(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            context.success(Actions.NOTIFY_LEAVE, "Success leave", { id });
            return context.Client.disconnect();
        }

        context.success(Actions.NOTIFY_LEAVE, "Already leaved");
    }

    getClients(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            const clients = services.rooms.getClients(id);
            return context.success(Actions.NOTIFY_GET_USERS, "Success send sockets", { users: clients });
        }

        context.badRequest(Actions.NOTIFY_GET_USERS, "Bad request")
    }
}

export default new RoomsActions();