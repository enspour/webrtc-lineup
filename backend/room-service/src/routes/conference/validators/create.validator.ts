import { body } from "express-validator";

export default [
    body("room_id").isNumeric().notEmpty(),
    body("name").isString().notEmpty(),
    body("description").isString().optional(),
];