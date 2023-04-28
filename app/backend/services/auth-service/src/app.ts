import { loadKeysAccessJWT, loadKeysRefreshJWT } from "@loaders/jwt.keys";
import createServer from "@loaders/http";
import createApp from "@loaders/app";

import { connect } from "postgresql/src/connection";

import logger from "@logger";

import serverConfig from "@configs/server.config";

(async () => {
    await loadKeysAccessJWT();
    logger.log("Keys of access token has been loaded.");

    await loadKeysRefreshJWT();
    logger.log("Keys of refresh token has been loaded.");

    await connect();
    logger.log("Connect to database is successful.");
    
    const app = await createApp();
    const server = createServer(app);

    const port = serverConfig.port;

    server.listen(port, () => logger.log(`Server has been started on port: ${port}`));
})();

