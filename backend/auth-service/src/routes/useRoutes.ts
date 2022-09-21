import { Router, Application } from "express";

import NotFound from "core/server/responses/NotFound.response";

import authRoute from "./auth/auth.route";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.use("/api/v1/auth-service", authRoute);

    router.use("*", (req, res) => 
        new NotFound(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

