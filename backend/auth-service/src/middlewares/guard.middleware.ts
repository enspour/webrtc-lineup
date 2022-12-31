import guardInit from "core/utils/guardInit";

import { accessTokenKeys } from "@loaders/jwt.keys";

const guardMiddleware = guardInit(accessTokenKeys.publicKey);

export default guardMiddleware;