import { Router } from "express";

import RoomController from "@controllers/Room.controller";

import AsyncHandler from "core/server/AsyncHandler";
import validatorMiddleware from "core/server/middlewares/validator.middleware";

import getUsersValidator from "./validators/getUsers.validator";

const router = Router();

router.get(
    "/:room_id/users",
    getUsersValidator, 
    validatorMiddleware,
    AsyncHandler(RoomController.getUsers)
);

export default router;