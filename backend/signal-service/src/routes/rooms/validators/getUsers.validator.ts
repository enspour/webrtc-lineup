import { param } from "express-validator";

export default [
    param("roomId").isString().notEmpty()
]