import createApp from "@loaders/app";
import createServer from "@loaders/http";
import createSocket from "@loaders/socket";
import { loadPublicKeyAccessJWT } from "@loaders/jwt.keys";

import logger from "@logger";

import serverConfig from "@configs/server.config";

(async () => {
    const app = createApp();
    const server = createServer(app);
    createSocket(server);

    await loadPublicKeyAccessJWT();
    logger.log("Public Key is success loaded");

    const port = serverConfig.port;

    server.listen(port, () => logger.log(`Server has been started on port: ${port}`));
})();