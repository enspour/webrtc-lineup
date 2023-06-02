import { Application, Router } from "express";

import publicRoutes from "./public";
import privateRoutes from "./private";

import NotFoundResponse from "core/server/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();

    router.use("/api/v1/chat-service/", publicRoutes);
    router.use("/api/v1/chat-service/private", privateRoutes);

    router.use("*", (req, res) => 
        new NotFoundResponse(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

