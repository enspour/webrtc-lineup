import { Router, Application } from "express";

import NotFound from "core/server-responses/responses/NotFound.response";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.get("/", (req, res) => res.end("hello world!"));

    router.use("*", (req, res) => 
        new NotFound(`URL: ${req.originalUrl} is not found.`).send(res));

    app.use(router);
}

export default useRoutes;

