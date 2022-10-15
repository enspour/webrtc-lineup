import { Server } from "socket.io";

let io;

const initIO = (_io: Server) => {
    io = _io;
}

export default initIO;

export { io };