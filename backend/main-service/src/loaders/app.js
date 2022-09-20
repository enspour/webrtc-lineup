const express = require("express");
const cookieParser = require('cookie-parser');

const createApp = () => {
    const useRoutes = require("@routes").default;

    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    useRoutes(app);

    return app;
}

export default createApp;