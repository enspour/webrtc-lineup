import { Router } from "express";

import MessagesController from "@controllers/Messages.controller";

import guardMiddleware from "@middlewares/guard.middleware";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import findAllValidator from "./validator/findAll.validator";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/:conference_id",
    guardMiddleware,
    findAllValidator,
    validatorMiddleware(),
    AsyncHandler(MessagesController.findAll)
)

export default router;