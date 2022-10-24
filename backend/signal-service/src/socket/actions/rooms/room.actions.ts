import { Socket } from "socket.io";

import { Actions } from "..";

import RoomsService from "@services/Rooms.service";

import joinValidator from "./validators/join.validator";
import idValidator from "./validators/id.validator";

import Success from "@socket/notifications/Success.notification";
import BadRequest from "@socket/notifications/BadRequest.notification";
import NotFound from "@socket/notifications/NotFound.notification";
import Broadcast from "@socket/notifications/Broadcast.notification";

import services from "@socket/services";

interface JoinPayload {
    id: string
    password: string
}

interface LeavePayload {
    id: string
}

interface GetSocketsPayload {
    id: string
}

export const JoinAction = (socket: Socket) => async (payload: JoinPayload) => {
    if (joinValidator(payload).length) {
        return new BadRequest(Actions.NOTIFY_JOIN, "Bad request").notify(socket)
    }
    
    const { id, password } = payload;

    const room = await RoomsService.findRoomWithSettingsById(BigInt(id));

    if (!room) {
        return new NotFound(Actions.NOTIFY_JOIN, "Room is not found").notify(socket);
    }

    if (room.settings.password !== password) {
        return new BadRequest(Actions.NOTIFY_JOIN, "Incorrect password").notify(socket);
    }
    
    const client = services.clients.createClient(socket);

    if (socket.rooms.size === 1) {
        await client.join(id);

        socket.once("disconnecting", _ => {
            const rooms = [...socket.rooms].filter(item => socket.id !== item);
            for (const roomId of rooms) {
                services.rooms.removeClient(roomId, socket.id);
                new Broadcast(Actions.NOTIFY_USER_LEAVE, { socketId: socket.id }).notify(socket, roomId);
            }
        });

        const data = {
            id: room.id.toString(),
            name: room.name,
            status: room.status,
            owner_id: room.owner_id.toString(),
            created_at: room.created_at,
        };

        new Success(Actions.NOTIFY_JOIN, "Success join", data).notify(socket);
        return new Broadcast(Actions.NOTIFY_USER_JOIN, { socketId: socket.id }).notify(socket, id);
    } else {
        return new Success(Actions.NOTIFY_JOIN, "Already connected").notify(socket);
    }
}

export const LeaveAction = (socket: Socket) => (payload: LeavePayload) => {
    if (idValidator(payload).length) {
        return new BadRequest(Actions.NOTIFY_JOIN, "Bad request").notify(socket)
    }

    const { id } = payload;

    const client = services.clients.createClient(socket);

    if (client.has(id)) {
        new Success(Actions.NOTIFY_LEAVE, "Success leave", { id }).notify(socket)
        return client.disconnect();
    }

    new Success(Actions.NOTIFY_LEAVE, "Already leaved").notify(socket);
}

export const GetClientsAction = (socket: Socket) => (payload: GetSocketsPayload) => {
    if (idValidator(payload).length) {
        return new BadRequest(Actions.NOTIFY_GET_USERS, "Bad request").notify(socket)
    }

    const { id } = payload;

    const client = services.clients.createClient(socket);

    if (client.has(id)) {
        const clients = services.rooms.getClients(id);
        return new Success(Actions.NOTIFY_GET_USERS, "Success send sockets", { users: clients }).notify(socket)
    }

    new BadRequest(Actions.NOTIFY_GET_USERS, "Bad request").notify(socket);
}