import { ActionContext } from "@socket/services/Actions.service";

import TypesActions from "./types.actions";

import { IdPayload } from "../validators/id.validator";
import { JoinRoomPayload } from "./validators/joinRoom.validator";

import RoomsService from "@services/Rooms.service";

import services from "@socket/services";

class RoomsActions { 
    async join(context: ActionContext<JoinRoomPayload>) {
        const { id, password } = context.Payload;

        const room = await RoomsService.findRoomAuthById(BigInt(id));

        if (!room) {
            return context.badRequest(TypesActions.NOTIFY_JOIN, "Room is not found");
        }

        if (room.auth.password && room.auth.password !== password) {
            return context.badRequest(TypesActions.NOTIFY_JOIN, "Incorrect password");
        }
        
        if (context.Client.CountRooms === 1) {
            await context.Client.join(id);
    
            const payload = {
                id: room.id.toString(),
                name: room.name,
                status: room.status,
                owner_id: room.owner_id.toString(),
                created_at: room.created_at,
            };
            
            context.success(TypesActions.NOTIFY_JOIN, "Success join", payload);
            return context.broadcast(id, TypesActions.NOTIFY_USER_JOIN, { socketId: context.Client.SocketId })
        } else {
            return context.success(TypesActions.NOTIFY_JOIN, "Already connected")
        }
    }

    leave(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            context.success(TypesActions.NOTIFY_LEAVE, "Success leave", { id });
            return context.Client.disconnect();
        }

        context.success(TypesActions.NOTIFY_LEAVE, "Already leaved");
    }

    getClients(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            const clients = services.rooms.getClients(id);
            return context.success(TypesActions.NOTIFY_GET_USERS, "Success send sockets", { users: clients });
        }

        context.badRequest(TypesActions.NOTIFY_GET_USERS, "Bad request")
    }
}

export default new RoomsActions();