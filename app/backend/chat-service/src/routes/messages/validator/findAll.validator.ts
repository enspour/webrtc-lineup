import { param } from "express-validator";

export default [
    param("conference_id").isString().trim().notEmpty(),
]