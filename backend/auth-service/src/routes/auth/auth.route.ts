import { Router } from "express";

import AuthController from "@controllers/Auth.controller";

import loginValidator from "./validators/login.validator";
import signupValidator from "./validators/signup.validator";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import asyncHandler from "core/server/AsyncHandler";

const router = Router();

router.post("/login", loginValidator, validatorMiddleware, asyncHandler(AuthController.login));
router.post("/signup", signupValidator, validatorMiddleware, asyncHandler(AuthController.signup));
router.post("/logout", guardMiddleware, asyncHandler(AuthController.logout));
router.post("/refresh", asyncHandler(AuthController.refresh));

router.get("/me", guardMiddleware, asyncHandler(AuthController.me));

export default router;