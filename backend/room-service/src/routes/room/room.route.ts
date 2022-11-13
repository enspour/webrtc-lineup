import { Router } from "express";

import RoomController from "@controllers/Room.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import createValidator from "./validators/create.validator";
import idValidator from "routes/validators/params/id.validator";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/:id", 
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    asyncHandler(RoomController.getRoom)
);

router.post("/", 
    guardMiddleware, 
    createValidator, 
    validatorMiddleware, 
    asyncHandler(RoomController.create)
);

router.delete("/:id", 
    guardMiddleware, 
    idValidator, 
    validatorMiddleware, 
    asyncHandler(RoomController.delete)
);

router.post("/favorites/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    asyncHandler(RoomController.addRoomToFavorites)
);

router.delete("/favorites/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    asyncHandler(RoomController.deleteRoomFromFavorites)
);

export default router;