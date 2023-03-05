import { Router } from "express";

import MessageController from "@controllers/Message.controller";

import createValidator from "./validators/create.validator";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.post("/", 
    createValidator,
    validatorMiddleware(),
    AsyncHandler(MessageController.create)
)

export default router;