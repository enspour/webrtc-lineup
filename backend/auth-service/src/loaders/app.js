const express = require("express");

const createApp = () => {
    const useRoutes = require("@routes/useRoutes").default;

    const app = express();

    app.use(express.json());

    useRoutes(app);

    return app;
}

export default createApp;