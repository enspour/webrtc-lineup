import { Router } from "express";

import RoomsController from "@controllers/Rooms.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import createValidators from "./validators/create.validators";
import deleteValidator from "./validators/delete.validator";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.post("/", 
    guardMiddleware, 
    createValidators, 
    validatorMiddleware, 
    asyncHandler(RoomsController.create)
);

router.delete("/:id", 
    guardMiddleware, 
    deleteValidator, 
    validatorMiddleware, 
    asyncHandler(RoomsController.delete)
);

router.get("/list-created",
    guardMiddleware,
    asyncHandler(RoomsController.getCreatedRooms)
)

export default router;