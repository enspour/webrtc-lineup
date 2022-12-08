import { body } from "express-validator"

export default [
    body("room_id").isString().notEmpty(),
    body("conference.id").isString().notEmpty(),
    body("conference.name").isString().notEmpty(),
];