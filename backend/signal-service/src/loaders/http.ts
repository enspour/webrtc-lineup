import http from "http";
import { Application } from "express";

const createServer = (app: Application) => {
    return http.createServer(app);
}

export default createServer;
