import { Socket } from "socket.io";
import { ErrorObject } from "ajv";

import Context from "./Context";
import User from "./User";

export default class SocketRouter {
    private user;

    constructor(private socket: Socket) {
        this.user = new User(this.socket);
    }

    register<T>(
        type: string, 
        handler: (context: Context<T>) => any,
        validation?: {
            validate: (payload: T) => ErrorObject[],
            action: string
        }    
    ) {
        const _handler = (payload: T) => {
            const context = new Context(payload, this.socket, this.user);

            if (validation && validation.validate(payload).length) {
                return context.badRequest(validation.action, "Payload is invalid");
            }

            handler(context);
        }

        this.socket.on(type, _handler);
    }
}