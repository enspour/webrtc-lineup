import { Router } from "express";

import AuthController from "../../controllers/Auth.controller";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/access-token/public-key", AsyncHandler(AuthController.accessTokenPublicKey));

export default router;