import { loadKeysAccessJWT, loadKeysRefreshJWT } from "@loaders/jwt.keys";
import createApp from "@loaders/app";
import createServer from "@loaders/http";
import connectToDataBase from "@loaders/db";

import logger from "@logger";

import serverConfig from "@configs/server.config";

(async () => {
    await loadKeysAccessJWT();
    await loadKeysRefreshJWT();

    await connectToDataBase();
    
    const app = createApp();
    const server = createServer(app);

    const port = serverConfig.port;

    server.listen(port, () => logger.log(`Server has been started on port: ${port}`));
})();

