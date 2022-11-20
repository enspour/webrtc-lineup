const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const createApp = () => {
    const useRoutes = require("@routes").default;

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    useRoutes(app);

    return app;
}

export default createApp;