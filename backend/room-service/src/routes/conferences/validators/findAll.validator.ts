import { param } from "express-validator";

export default [
    param("room_id").isString().notEmpty(),
];