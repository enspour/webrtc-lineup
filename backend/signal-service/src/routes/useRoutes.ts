import { Router, Application } from "express";

import rooms from "./rooms/rooms.route";

const useRoutes = (app: Application) => {
    const router = Router();

    router.use("/api/v1/signal-service/rooms/", rooms);

    app.use(router);
}

export default useRoutes;