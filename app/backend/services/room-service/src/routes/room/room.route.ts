import { Router } from "express";

import RoomController from "@controllers/Room.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import updateVisibilityValidator from "./validators/updateVisibility.validator";
import updateNameValidator from "./validators/updateName.validator";
import createValidator from "./validators/create.validator";
import idValidator from "routes/validators/params/id.validator";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/:id", 
    guardMiddleware,
    idValidator,
    validatorMiddleware(),
    asyncHandler(RoomController.findOne)
);

router.post("/", 
    guardMiddleware, 
    createValidator, 
    validatorMiddleware("Incorrectly entered data. Please fill in the required fields."), 
    asyncHandler(RoomController.create)
);

router.delete("/:id", 
    guardMiddleware, 
    idValidator, 
    validatorMiddleware(), 
    asyncHandler(RoomController.delete)
);

router.post("/favorites/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware(),
    asyncHandler(RoomController.addRoomToFavorites)
);

router.delete("/favorites/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware(),
    asyncHandler(RoomController.deleteRoomFromFavorites)
);

router.post("/name",
    guardMiddleware,
    updateNameValidator,
    validatorMiddleware("Incorrectly entered data. Please check the correctness."),
    asyncHandler(RoomController.updateName)
)

router.post("/settings/visibility", 
    guardMiddleware,
    updateVisibilityValidator,
    validatorMiddleware(),
    asyncHandler(RoomController.updateVisibility)
);

export default router;