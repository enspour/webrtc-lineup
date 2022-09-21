import { Router } from "express";

import controllers from "@controllers";

import loginValidator from "./validators/login.validator";
import signupValidator from "./validators/signup.validator";

import validatorMiddleware from "core/server/middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import asyncHandler from "core/server/AsyncHandler";

const authRoute = Router();

authRoute.post("/login", loginValidator, validatorMiddleware, asyncHandler(controllers.auth.login));
authRoute.post("/signup", signupValidator, validatorMiddleware, asyncHandler(controllers.auth.signup));
authRoute.post("/logout", guardMiddleware, asyncHandler(controllers.auth.logout));
authRoute.post("/refresh", asyncHandler(controllers.auth.refresh));

authRoute.get("/me", guardMiddleware, asyncHandler(controllers.auth.me));
authRoute.get("/access-token/public-key", asyncHandler(controllers.auth.accessTokenPublicKey));

export default authRoute;