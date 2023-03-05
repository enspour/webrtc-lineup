import { Router } from "express";

import ConferenceController from "@controllers/Conference.controller";

import createValidator from "./validators/create.validator";
import deleteValidator from "./validators/delete.validator";
import updateNameValidator from "./validators/updateName.validator";
import updateDescriptionValidator from "./validators/updateDescription.validator";
import updateEnableAudioValidator from "./validators/updateEnableAudio.validator";
import updateEnableVideoValidator from "./validators/updateEnableVideo.validator";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.post("/",
    guardMiddleware,
    createValidator,
    validatorMiddleware("Incorrectly entered data. Please fill in the required fields."),
    asyncHandler(ConferenceController.create)
);

router.delete("/:id",
    guardMiddleware,
    deleteValidator,
    validatorMiddleware(),
    asyncHandler(ConferenceController.delete)
);

router.post("/name",
    guardMiddleware,
    updateNameValidator,
    validatorMiddleware("Incorrectly entered data. Please check the correctness."),
    asyncHandler(ConferenceController.updateName)
);

router.post("/description",
    guardMiddleware,
    updateDescriptionValidator,
    validatorMiddleware("Incorrectly entered data. Please check the correctness."),
    asyncHandler(ConferenceController.updateDescription)
);

router.post("/settings/enable_audio", 
    guardMiddleware,
    updateEnableAudioValidator,
    validatorMiddleware(),
    asyncHandler(ConferenceController.updateEnableAudio)
);

router.post("/settings/enable_video", 
    guardMiddleware,
    updateEnableVideoValidator,
    validatorMiddleware(),
    asyncHandler(ConferenceController.updateEnableVideo)
);

export default router;