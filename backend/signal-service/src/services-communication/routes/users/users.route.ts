import { Router } from "express";

import updateRoomValidator from "./validators/updateRoom.validator";
import updateConferenceValidator from "./validators/updateConference.validator";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import UsersController from "@services-communication/controllers/Users.controller";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.put("/update-room-information", 
    updateRoomValidator,
    validatorMiddleware,
    AsyncHandler(UsersController.updateRoomInformation)
);

router.put("/update-conference-information",
    updateConferenceValidator,
    validatorMiddleware,
    AsyncHandler(UsersController.updateConferenceInformation)
)

export default router;