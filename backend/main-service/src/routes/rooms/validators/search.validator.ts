import { query } from "express-validator";

const commaToArray = (value: string) => value ? value.split(',') : []

export default [
    query("name").isString().optional(),
    query("tags").customSanitizer(commaToArray),
    query("tags.*").isString().notEmpty(),
]