import { Router } from "express";

import controllers from "@controllers";

import loginValidator from "./validators/login.validator";
import signupValidator from "./validators/signup.validator";

import validatorMiddleware from "@middlewares/validator.middleware";

import asyncHandler from "core/server-responses/AsyncHandler";

const authRoute = Router();

authRoute.post("/login", loginValidator, validatorMiddleware, asyncHandler(controllers.auth.login));
authRoute.post("/signup", signupValidator, validatorMiddleware, asyncHandler(controllers.auth.signup));
authRoute.post("/logout", asyncHandler(controllers.auth.logout));

authRoute.get("/me", asyncHandler(controllers.auth.me));

export default authRoute;