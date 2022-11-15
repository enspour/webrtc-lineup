const express = require("express");

const createApp = () => {
    const app = express();

    app.use(express.json());
    
    const useRoutes = require("@routes").default

    useRoutes(app)

    return app;
}

export default createApp;