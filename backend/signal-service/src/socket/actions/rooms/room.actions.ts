import { Socket } from "socket.io";

import { Actions } from "..";

import RoomsService from "@services/Rooms.service";

import joinValidator from "./validators/join.validator";
import leaveValidator from "./validators/leave.validator";
import getSocketsValidator from "./validators/getSockets.validator";

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

export const initJoinRoom = (socket: Socket) => async (payload: JoinPayload) => {
    if (joinValidator(payload).length) {
        return new BadRequest(Actions.NOTIFY_JOIN, "Bad request").notify(socket)
    }
    
    const { id, password } = payload;
        
    if (socket.rooms.size > 1) { 
        return new Success(Actions.NOTIFY_JOIN, "Already connected", { id }).notify(socket);
    }

    const room = await RoomsService.findRoomWithSettingsById(BigInt(id));

    if (!room) {
        return new NotFound(Actions.NOTIFY_JOIN, "Room is not found").notify(socket);
    }

    if (room.settings.password === password) {
        services.rooms.join(socket, id);

        const data = {
            id: room.id.toString(),
            name: room.name,
            status: room.status,
            owner_id: room.owner_id.toString(),
            created_at: room.created_at,
        }

        new Success(Actions.NOTIFY_JOIN, "Success join", data).notify(socket);
        return new Broadcast(Actions.NOTIFY_USER_JOIN, { socketId: socket.id }).notify(socket, id);
    }

    new BadRequest(Actions.NOTIFY_JOIN, "Incorrect password").notify(socket)
}

export const initLeaveRoom = (socket: Socket) => (payload: LeavePayload) => {
    if (leaveValidator(payload).length) {
        return new BadRequest(Actions.NOTIFY_JOIN, "Bad request").notify(socket)
    }

    const { id } = payload;

    if (socket.rooms.has(id)) {
        new Success(Actions.NOTIFY_LEAVE, "Success leave", { id }).notify(socket)
        return socket.disconnect();
    }

    new BadRequest(Actions.NOTIFY_LEAVE, "Already leaved").notify(socket);
}

export const initGetUsersRoom = (socket: Socket) => (payload: GetSocketsPayload) => {
    if (getSocketsValidator(payload).length) {
        return new BadRequest(Actions.NOTIFY_GET_USERS, "Bad request").notify(socket)
    }

    const { id } = payload;

    if (socket.rooms.has(id)) {
        const users = services.rooms.getUsers(id);
        return new Success(Actions.NOTIFY_GET_USERS, "Success send sockets", { users }).notify(socket)
    }

    new BadRequest(Actions.NOTIFY_GET_USERS, "Bad request").notify(socket);
}