import { Router } from "express";

import ConferencesController from "@controllers/Conferences.controller";

import AsyncHandler from "core/server/AsyncHandler";

import guardMiddleware from "@middlewares/guard.middleware";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import findAllValidator from "./validators/findAll.validator";

const router = Router();

router.get("/:room_id",
    guardMiddleware,
    findAllValidator,
    validatorMiddleware(),
    AsyncHandler(ConferencesController.findAll)    
)

export default router;