import { Router } from "express";

import UserController from "@controllers/User.controller";

import AsyncHandler from "core/server/AsyncHandler";

import validatorMiddleware from "core/server/middlewares/validator.middleware";

import idValidator from "@routes/validators/params/id.validator";

const router = Router();

router.get("/:id",
    idValidator,
    validatorMiddleware(),
    AsyncHandler(UserController.findOne)
);

export default router;