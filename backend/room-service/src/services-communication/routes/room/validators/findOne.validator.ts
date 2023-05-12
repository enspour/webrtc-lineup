import { query } from "express-validator"

export default [
    query("id").isString().notEmpty(),
    query("user_id").isString().notEmpty(),
];