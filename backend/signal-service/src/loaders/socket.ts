import http from "http"
import { Server } from "socket.io"

import initIO from "@socket/io";
import initEvents from "@socket/events";
import initActions from "@socket/actions";
import initMiddlewares from "@socket/middlewares";

const createSocket = (server: http.Server) => {
    const io = new Server(server, {
        path: "/api/v1/signal-service/socket/",
        cookie: true,
    });

    initIO(io);
    initMiddlewares(io);
    initEvents(io);
    initActions(io);

    return io;
}

export default createSocket;