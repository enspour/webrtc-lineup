import { Router } from "express";

import RoomController from "@controllers/Room.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import idValidator from "routes/validators/params/id.validator";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/:id", 
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    asyncHandler(RoomController.getRoom)
);

export default router;