import { Router, Application } from "express";

import authRoute from "./auth/auth.route";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.use("/api/v1/auth-service", authRoute);

    app.use(router);
}

export default useRoutes;

