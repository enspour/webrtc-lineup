import { Router } from "express";

import ConferencesController from "@controllers/Conferences.controller";

import idValidator from "routes/validators/params/id.validator";

import guardMiddleware from "@middlewares/guard.middleware";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import AsyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    AsyncHandler(ConferencesController.findAll)    
)

export default router;