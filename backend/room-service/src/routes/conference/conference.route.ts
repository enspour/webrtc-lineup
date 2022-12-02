import { Router } from "express";

import ConferenceController from "@controllers/Conference.controller";

import createValidator from "./validators/create.validator";
import deleteValidator from "./validators/delete.validator";
import updateEnableAudioValidator from "./validators/updateEnableAudio.validator";
import updateEnableVideoValidator from "./validators/updateEnableVideo.validator";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.post("/",
    guardMiddleware,
    createValidator,
    validatorMiddleware,
    asyncHandler(ConferenceController.create)
);

router.delete("/:id",
    guardMiddleware,
    deleteValidator,
    validatorMiddleware,
    asyncHandler(ConferenceController.delete)
);

router.post("/settings/enable_audio", 
    guardMiddleware,
    updateEnableAudioValidator,
    validatorMiddleware,
    asyncHandler(ConferenceController.updateEnableAudio)
);

router.post("/settings/enable_video", 
    guardMiddleware,
    updateEnableVideoValidator,
    validatorMiddleware,
    asyncHandler(ConferenceController.updateEnableVideo)
);

export default router;