import { Router, Application } from "express";

import roomRoutes from "./room/room.route";
import roomsRoutes from "./rooms/rooms.route";
import roomSettingsRoutes from "./room-settings/room-settings.router";

import NotFoundResponse from "core/server/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.use("/api/v1/room-service/room", roomRoutes);
    router.use("/api/v1/room-service/rooms", roomsRoutes);
    router.use("/api/v1/room-service/room-settings", roomSettingsRoutes);

    router.use("*", (req, res) => 
        new NotFoundResponse(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

