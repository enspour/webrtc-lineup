import { body } from "express-validator";

export default [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
    body("rememberme").isBoolean().notEmpty()
];