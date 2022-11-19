import { body } from "express-validator";

export default [
    body("room_id").isString().notEmpty(),
    body("conference_id").isString().notEmpty(),
    body("enable_audio").isBoolean().toBoolean(),
];