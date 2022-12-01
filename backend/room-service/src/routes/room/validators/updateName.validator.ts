import { body } from "express-validator";

export default [
    body("id").isNumeric().notEmpty(),
    body("name").isString().notEmpty(),
];