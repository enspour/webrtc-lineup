import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const createApp = async () => {
    const useRoutes = (await import("@routes")).default;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    useRoutes(app);

    return app;
}

export default createApp;