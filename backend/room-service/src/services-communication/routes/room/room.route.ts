import { Router } from "express";

import RoomController from "@services-communication/controllers/Room.controller";

import withAuthValidator from "./validators/withAuth.validator";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/with-auth",
    withAuthValidator,
    validatorMiddleware,
    AsyncHandler(RoomController.findOneWithAuth)
);

export default router;