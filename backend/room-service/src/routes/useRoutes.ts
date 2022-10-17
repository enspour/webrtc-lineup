import { Router, Application } from "express";

import roomsRoute from "./rooms/rooms.route";

import NotFound from "core/server/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.use("/api/v1/room-service/rooms", roomsRoute);

    router.use("*", (req, res) => 
        new NotFound(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

