import { body } from "express-validator";

export default [
    body("id").isString().notEmpty(),
    body("enable_audio").isBoolean().toBoolean(),
];