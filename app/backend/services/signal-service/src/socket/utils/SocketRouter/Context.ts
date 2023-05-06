import { Socket } from "socket.io";

import BadRequest from "@socket/notifications/BadRequest.notification";
import Broadcast from "@socket/notifications/Broadcast.notification";
import NotFound from "@socket/notifications/NotFound.notification";
import Success from "@socket/notifications/Success.notification";
import ServerError from "@socket/notifications/ServerError.notification";

import User from "./User";

export default class Context<T> {
    constructor(
        private payload: T, 
        private socket: Socket, 
        private user: User
    ) {}

    get User() {
        return this.user;
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

    serverError(action: string, message: string, data?: any) {
        return new ServerError(action, message, data).notify(this.socket);
    }

    broadcast(channelId: string, action: string, data: any) {
        return new Broadcast(action, data).notify(this.socket, channelId);
    }
}
