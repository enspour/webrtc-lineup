import { body } from "express-validator";

export default [
    body("name").isString().notEmpty(),
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
    body("remember_me").isBoolean().notEmpty()
];