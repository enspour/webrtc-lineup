import { body } from "express-validator";

export default [
    body("id").isNumeric().notEmpty(),
    body("visibility").isBoolean().toBoolean(),
];