import express from "express"

const createApp = async () => {
    const useRoutes = (await import("@routes")).default;

    const app = express();

    app.use(express.json());

    useRoutes(app)

    return app;
}

export default createApp;