import { body } from "express-validator";

export default [
    body("name").isString().notEmpty(),
    body("password").isString(),
    body("tags.*").isString().notEmpty(),
];