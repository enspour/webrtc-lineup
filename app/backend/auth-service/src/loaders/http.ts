import http from "node:http";

import express from "express";

const createServer = (app: express.Application) => {
    const server = http.createServer(app);

    return server;
}

export default createServer;