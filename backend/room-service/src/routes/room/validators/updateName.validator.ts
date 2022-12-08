import { body } from "express-validator";

export default [
    body("id").isString().notEmpty(),
    body("name").isString().notEmpty(),
];