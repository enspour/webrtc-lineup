import { Socket } from "socket.io";
import { ErrorObject } from "ajv";

import RoomsService from "./Rooms.service";

import BadRequest from "@socket/notifications/BadRequest.notification";
import Broadcast from "@socket/notifications/Broadcast.notification";
import NotFound from "@socket/notifications/NotFound.notification";
import Success from "@socket/notifications/Success.notification";

import parseId from "@utils/parseId";

class Client {
    constructor(private socket: Socket, private rooms: RoomsService) {}

    get SocketId() {
        return this.socket.id;
    }

    get CountRooms() {
        return this.socket.rooms.size;
    }

    async join(roomId: string) {
        await this.socket.join(roomId);

        const userId = parseId(this.socket.request);
        this.rooms.addClient(roomId, { socketId: this.socket.id, userId });
    }

    async leave(roomId: string) {
        await this.socket.leave(roomId);
        this.rooms.removeClient(roomId, this.socket.id);
    }

    has(roomId: string) {
        return this.socket.rooms.has(roomId);
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export class ActionContext<T> {
    private client;

    constructor(private socket: Socket, private payload: T, roomsService: RoomsService) {
        this.client = new Client(socket, roomsService); 
    }

    get Client() {
        return this.client;
    }
    
    get Payload() {
        return this.payload;
    }

    success(action: string, message: string, data?: any) {
        return new Success(action, message, data).notify(this.socket);
    }

    badRequest(action: string, message: string, data?: any) {
        return new BadRequest(action, message, data).notify(this.socket);
    }

    notFound(action: string, message: string, data?: any) {
        return new NotFound(action, message, data).notify(this.socket);
    }

    broadcast(roomId: string, action: string, data: any) {
        return new Broadcast(action, data).notify(this.socket, roomId);
    }
}

export default class ActionsService {
    constructor(private roomsService: RoomsService) {}

    create<T>(
        socket: Socket, 
        handler: (context: ActionContext<T>) => any,
        validation?: {
            validate: (payload: T) => ErrorObject[],
            action: string
        },
    ) {
        return (payload: T) => {
            const context = new ActionContext(socket, payload, this.roomsService);

            if (validation && validation.validate(payload).length) {
                return context.badRequest(validation.action, "Payload is invalid");
            }

            handler(context);
        }
    }
}