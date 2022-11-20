import { Router } from "express";

import idParamsValidator from "./validators/id.params.validator";

import validatorMiddleware from "core/server/middlewares/validator.middleware";

import UsersController from "@services-communication/controllers/Users.controller";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.put("/update-room-inforamtion/:id", 
    idParamsValidator,
    validatorMiddleware,
    AsyncHandler(UsersController.updateRoomInformation)
);

router.put("/update-conference-information/:id",
    idParamsValidator,
    validatorMiddleware,
    AsyncHandler(UsersController.updateConferenceInformation)
)

export default router;