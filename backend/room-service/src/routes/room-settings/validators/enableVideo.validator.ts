import { body } from "express-validator";

export default [
    body("id").isString().notEmpty(),
    body("enable_video").isBoolean().toBoolean(),
];