import { Router, Application } from "express";

import messagesRoutes from "./messages/messages.route";

import servicesCommunicationRoutes from "@services-communication/routers";

import NotFoundResponse from "core/server/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();

    router.use("/api/v1/chat-service/messages", messagesRoutes)

    router.use("/services-communication/chat-service/", servicesCommunicationRoutes);

    router.use("*", (req, res) => 
        new NotFoundResponse(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

