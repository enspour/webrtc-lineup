import { body } from "express-validator"

export default [
    body("room.id").isString().notEmpty(),
    body("room.name").isString().notEmpty(),
];