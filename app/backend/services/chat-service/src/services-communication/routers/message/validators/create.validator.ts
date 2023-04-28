import { body } from "express-validator";

export default [
    body("conference_id").isString().trim().notEmpty(),
    body("text").isString().trim().notEmpty(),
    body("user.id").isString().trim().notEmpty(),
    body("user.name").isString().trim().notEmpty(),
]