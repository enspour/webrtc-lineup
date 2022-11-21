import createApp from "@loaders/app";
import createServer from "@loaders/http";
import createSocket from "@loaders/socket";
import { loadPublicKeyAccessJWT } from "@loaders/jwt.keys";

import { connect } from "core/database/src/connection";

import logger from "@logger";

import serverConfig from "@configs/server.config";

(async () => {
    await connect();
    logger.log("Connect to database is successful.");

    await loadPublicKeyAccessJWT();
    logger.log("Public Key is success loaded");

    const app = await createApp();
    const server = createServer(app);
    createSocket(server);

    const port = serverConfig.port;

    server.listen(port, () => logger.log(`Server has been started on port: ${port}`));
})();