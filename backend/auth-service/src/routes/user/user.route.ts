import { Router } from "express";

import UserController from "@controllers/User.controller";

import AsyncHandler from "core/server/AsyncHandler";

import guardMiddleware from "@middlewares/guard.middleware";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import idValidator from "@routes/validators/params/id.validator";

const router = Router();

router.get("/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware(),
    AsyncHandler(UserController.findOne)
);

export default router;