import { Socket } from "socket.io";

export default class BroadcastAll {
    constructor(private action: string, private data: any) {}

    notify(socket: Socket, to: string) {
        socket.broadcast.in(to).emit(this.action, this.data);
    }
}