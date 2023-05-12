import { Router, Application } from "express";

import authRoutes from "./auth/auth.route";
import userRoutes from "./user/user.route";

import servicesCommunicationRoutes from "@services-communication/routes";

import NotFoundResponse from "core/server/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.use("/api/v1/auth-service/auth", authRoutes);
    router.use("/api/v1/auth-service/user", userRoutes);

    router.use("/services-communication/auth-service/", servicesCommunicationRoutes);

    router.use("*", (req, res) => 
        new NotFoundResponse(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

