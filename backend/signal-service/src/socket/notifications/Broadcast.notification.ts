import { Socket } from "socket.io";

export default class Broadcast {
    constructor(private action: string, private data: any) {}

    notify(socket: Socket, to: string) {
        socket.broadcast.to(to).emit(this.action, this.data);
    }
}