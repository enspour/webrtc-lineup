import { Router } from "express";

import RoomSettingsController from "@controllers/RoomSettings.controller";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import visibilityValidator from "./validators/visibility.validator";

import asyncHandler from "core/server/AsyncHandler";
import enableAudioValidator from "./validators/enableAudio.validator";
import enableVideoValidator from "./validators/enableVideo.validator";

const router = Router();

router.post("/visibility", 
    guardMiddleware,
    visibilityValidator,
    validatorMiddleware,
    asyncHandler(RoomSettingsController.updateVisibility)
);

router.post("/enable_audio", 
    guardMiddleware,
    enableAudioValidator,
    validatorMiddleware,
    asyncHandler(RoomSettingsController.updateEnableAudio)
);

router.post("/enable_video", 
    guardMiddleware,
    enableVideoValidator,
    validatorMiddleware,
    asyncHandler(RoomSettingsController.updateEnableVideo)
);

export default router;