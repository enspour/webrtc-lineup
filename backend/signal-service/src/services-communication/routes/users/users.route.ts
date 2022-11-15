import { Router } from "express";

import idValidator from "./validators/params/id.validator";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import UsersController from "@services-communication/controllers/Users.controller";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.put("/update-room-inforamtion/:id", 
    idValidator,
    validatorMiddleware,
    AsyncHandler(UsersController.updateRoomInformation)
);

export default router;