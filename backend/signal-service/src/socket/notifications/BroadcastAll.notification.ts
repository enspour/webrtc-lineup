import { io } from "@socket/io";

export default class BroadcastAll {
    constructor(private action: string, private data: any) {}

    notify(to: string) {
        io.in(to).emit(this.action, this.data);
    }
}