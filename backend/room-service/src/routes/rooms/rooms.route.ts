import { Router } from "express";

import RoomsController from "@controllers/Rooms.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import searchValidator from "./validators/search.validator";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.get("/",
    guardMiddleware,
    asyncHandler(RoomsController.findCreatedRooms)
);

router.get("/favorites", 
    guardMiddleware,
    asyncHandler(RoomsController.findFavoritesRooms)
);

router.get("/search",
    guardMiddleware,
    searchValidator,
    validatorMiddleware(),
    asyncHandler(RoomsController.search)
);

export default router;