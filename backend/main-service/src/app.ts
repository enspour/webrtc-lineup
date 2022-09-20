import createServer from "@loaders/http";
import createApp from "@loaders/app";

import { connect } from "core/database/src/connection";

import logger from "@logger";

import serverConfig from "@configs/server.config";

(async () => {
    await connect();
    logger.log("Connect to database is successful.");
    
    const app = createApp();
    const server = createServer(app);

    const port = serverConfig.port;

    server.listen(port, () => logger.log(`Server has been started on port: ${port}`));
})();