import { body } from "express-validator";

export default [
    body("conference_id").isString().notEmpty(),
    body("enable_video").isBoolean().toBoolean(),
];