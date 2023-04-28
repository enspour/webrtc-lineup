import express from "express";
import cookieParser from "cookie-parser";

const createApp = async () => {
    const useRoutes = (await import("@routes/useRoutes")).default;

    const app = express();

    app.use(express.json());
    app.use(cookieParser())

    useRoutes(app);

    return app;
}

export default createApp;