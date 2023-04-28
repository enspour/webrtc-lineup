import guardInit from "core/utils/guardInit";

import { accessToken } from "@loaders/jwt.keys";

const guardMiddleware = guardInit(accessToken.publicKey);

export default guardMiddleware;