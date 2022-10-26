import { Router } from "express";

import AuthController from "@controllers/Auth.controller";

import loginValidator from "./validators/login.validator";
import signupValidator from "./validators/signup.validator";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import asyncHandler from "core/server/AsyncHandler";

const authRoute = Router();

authRoute.post("/login", loginValidator, validatorMiddleware, asyncHandler(AuthController.login));
authRoute.post("/signup", signupValidator, validatorMiddleware, asyncHandler(AuthController.signup));
authRoute.post("/logout", guardMiddleware, asyncHandler(AuthController.logout));
authRoute.post("/refresh", asyncHandler(AuthController.refresh));

authRoute.get("/me", guardMiddleware, asyncHandler(AuthController.me));
authRoute.get("/access-token/public-key", asyncHandler(AuthController.accessTokenPublicKey));

export default authRoute;