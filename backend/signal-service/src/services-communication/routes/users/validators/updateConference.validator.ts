import { body } from "express-validator"

export default [
    body("conference.id").isString().notEmpty(),
    body("conference.name").isString().notEmpty(),
];