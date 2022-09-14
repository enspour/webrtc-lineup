const express = require("express");

const createApp = () => {
    const useRoutes = require("@routes/useRoutes").default;

    const app = express();

    useRoutes(app);

    return app;
}

export default createApp;