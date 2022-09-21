import { Router } from "express";

import controllers from "@controllers";

import loginValidator from "./validators/login.validator";
import signupValidator from "./validators/signup.validator";

import validatorMiddleware from "@middlewares/validator.middleware";
import guardMiddleware from "@middlewares/guard.middleware";

import asyncHandler from "core/server-responses/AsyncHandler";

const authRoute = Router();

authRoute.post("/login", loginValidator, validatorMiddleware, asyncHandler(controllers.auth.login));
authRoute.post("/signup", signupValidator, validatorMiddleware, asyncHandler(controllers.auth.signup));
authRoute.post("/logout", guardMiddleware, asyncHandler(controllers.auth.logout));
authRoute.post("/refresh", guardMiddleware, asyncHandler(controllers.auth.refresh));

authRoute.get("/me", guardMiddleware, asyncHandler(controllers.auth.me));

export default authRoute;