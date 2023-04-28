import createApp from "@loaders/app";
import createServer from "@loaders/http";
import { loadPublicKeyAccessJWT } from "@loaders/jwt.keys";

import { connect } from "cassandra/src/connection";

import logger from "@logger";

import serverConfig from "@configs/server.config";

(async () => {
    await loadPublicKeyAccessJWT();
    logger.log("Public Key is success loaded");

    await connect();
    logger.log("Success connect to cassandra");

    const app = await createApp();
    const server = createServer(app);

    const port = serverConfig.port;

    server.listen(port, () => logger.log(`Server has been started on port: ${port}`));
})();