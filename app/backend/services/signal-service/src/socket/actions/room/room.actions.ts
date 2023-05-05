import { ActionContext } from "@socket/services/Actions.service";

import { RoomActionsTypes } from "@socket/types";

import { IdPayload } from "../validators/id.validator";
import { JoinPayload } from "./validators/join.validator";

import RoomService from "@services-communication/services/Room.service";

class RoomsActions { 
    async join(context: ActionContext<JoinPayload>) {
        const { id, password } = context.Payload;

        const userId = context.Client.UserId;

        const room = await RoomService.findOneWithAuth(id, userId);

        if (!room) {
            return context.badRequest(RoomActionsTypes.NOTIFY_ROOM_JOIN, "Room is not found");
        }

        if (room.auth.password && room.auth.password !== password) {
            return context.badRequest(RoomActionsTypes.NOTIFY_ROOM_JOIN, "Incorrect password");
        }
        
        if (context.Client.CountRooms === 1) {
            await context.Client.join(id);
    
            const payload = {
                id: room.id.toString(),
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
            
            context.success(RoomActionsTypes.NOTIFY_ROOM_JOIN, "Success join", payload);
            
            return context.broadcast(
                id, 
                RoomActionsTypes.NOTIFY_ROOM_USER_JOINED, 
                { socketId: context.Client.SocketId }
            );
        } else {
            return context.success(RoomActionsTypes.NOTIFY_ROOM_JOIN, "Already connected")
        }
    }

    leave(context: ActionContext<IdPayload>) {
        const { id } = context.Payload;

        if (context.Client.has(id)) {
            context.success(RoomActionsTypes.NOTIFY_ROOM_LEAVE, "Success leave", { id });
            return context.Client.disconnect();
        }

        context.success(RoomActionsTypes.NOTIFY_ROOM_LEAVE, "Already leaved");
    }
}

export default new RoomsActions();