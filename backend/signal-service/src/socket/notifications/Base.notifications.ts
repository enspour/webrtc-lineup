import { Socket } from "socket.io";

export default class Base {
    constructor(private action: string, private status: number, private message: string, private data?: any) {}

    protected prepare() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        }
    }

    notify(socket: Socket) {
        socket.emit(this.action, this.prepare())
    } 
}