import { Router, Application } from "express";

import servicesCommunicationRoutes from "@services-communication/routes";

import roomRoutes from "./room/room.route";

import NotFoundResponse from "core/server/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();

    router.use("/api/v1/signal-service/room/", roomRoutes);

    router.use("/services-communication/signal-service/", servicesCommunicationRoutes);

    router.use("*", (req, res) => 
        new NotFoundResponse(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;