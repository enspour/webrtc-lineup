import Context from "@socket/utils/SocketRouter/Context";

import ActionsTypes from "./actions.types";

import { IdPayload } from "../validators/id.validator";
import { JoinPayload } from "./validators/join.validator";

import RoomService from "@services-communication/services/Room.service";

class RoomsActions { 
    async join(context: Context<JoinPayload>) {
        const { id, password } = context.Payload;

        const userId = context.User.Id;

        const room = await RoomService.findOneWithAuth(id, userId);

        if (!room) {
            return context.badRequest(ActionsTypes.NOTIFY_ROOM_JOIN, "Room is not found");
        }

        if (room.auth.password && room.auth.password !== password) {
            return context.badRequest(ActionsTypes.NOTIFY_ROOM_JOIN, "Incorrect password");
        }
        
        if (context.User.Channels.Count === 1) {
            await context.User.Channels.join(id, "room");
    
            const payload = {
                id: room.id,
                name: room.name,
                owner: {
                    id: room.owner.id.toString(),
                    name: room.owner.name,
                },
                settings: {
                    visibility: room.settings.visibility,
                },
                created_at: room.created_at,
            };
            
            context.success(ActionsTypes.NOTIFY_ROOM_JOIN, "Success join", payload);
            
            return context.broadcast(
                id, 
                ActionsTypes.NOTIFY_ROOM_USER_JOINED, 
                { socketId: context.User.SocketId }
            );
        } else {
            return context.success(ActionsTypes.NOTIFY_ROOM_JOIN, "Already connected")
        }
    }

    leave(context: Context<IdPayload>) {
        const { id } = context.Payload;

        if (context.User.Channels.has(id)) {
            context.success(ActionsTypes.NOTIFY_ROOM_LEAVE, "Success leave", { id });
            return context.User.disconnect();
        }

        context.success(ActionsTypes.NOTIFY_ROOM_LEAVE, "Already leaved");
    }
}

export default new RoomsActions();