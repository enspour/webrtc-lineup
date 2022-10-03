import { Router } from "express";

import RoomsController from "@controllers/Rooms.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import createValidator from "./validators/create.validator";
import searchValidator from "./validators/search.validator";
import idValidator from "../validators/params/id.validator";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.post("/", 
    guardMiddleware, 
    createValidator, 
    validatorMiddleware, 
    asyncHandler(RoomsController.create)
);

router.delete("/:id", 
    guardMiddleware, 
    idValidator, 
    validatorMiddleware, 
    asyncHandler(RoomsController.delete)
);

router.get("/",
    guardMiddleware,
    asyncHandler(RoomsController.getCreatedRooms)
);

router.get("/favorites", 
    guardMiddleware,
    asyncHandler(RoomsController.getFavoritesRooms)
);

router.post("/favorites/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    asyncHandler(RoomsController.addRoomToFavorites)
);

router.delete("/favorites/:id",
    guardMiddleware,
    idValidator,
    validatorMiddleware,
    asyncHandler(RoomsController.deleteRoomFromFavorites)
);

router.get("/search",
    guardMiddleware,
    searchValidator,
    validatorMiddleware,
    asyncHandler(RoomsController.search)
);

export default router;