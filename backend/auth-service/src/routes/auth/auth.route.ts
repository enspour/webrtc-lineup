import { Router } from "express";

import controllers from "@controllers";

import loginValidator from "./validators/login.validator";
import signupValidator from "./validators/signup.validator";

import validatorMiddleware from "@middlewares/validator.middleware";

const authRoute = Router();

authRoute.post("/login", loginValidator, validatorMiddleware, controllers.auth.login);
authRoute.post("/signup", signupValidator, validatorMiddleware, controllers.auth.signup);
authRoute.post("/logout", controllers.auth.logout);
authRoute.post("/refresh", controllers.auth.refresh);

export default authRoute;