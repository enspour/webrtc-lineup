import http from "node:http";

import express from "express";

const createServer = (app: express.Application) => {
    return http.createServer(app);
}

export default createServer;