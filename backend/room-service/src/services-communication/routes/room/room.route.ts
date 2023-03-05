import { Router } from "express";

import RoomController from "@services-communication/controllers/Room.controller";

import findOneValidator from "./validators/findOne.validator";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/with-auth",
    findOneValidator,
    validatorMiddleware(),
    AsyncHandler(RoomController.findOneWithAuth)
);

export default router;