import http from "http"
import { Server } from "socket.io"

import initIO from "@socket/io";
import initEvents from "@socket/events";

const createSocket = (server: http.Server) => {
    const io = new Server(server, {
        path: "/api/v1/signal-service/socket/",
        cookie: true,
    });

    initIO(io);
    initEvents(io);

    return io;
}

export default createSocket;