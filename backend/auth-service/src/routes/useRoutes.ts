import { Router, Application } from "express";

const useRoutes = (app: Application) => {
    const router = Router();
    
    router.get("/", (req, res) => res.end("Hello world!"));

    app.use(router);
}

export default useRoutes;

