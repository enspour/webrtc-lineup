import { query } from "express-validator";

const commaToArray = (value: string) => value ? value.split(',') : []

export default [
    query("words").customSanitizer(commaToArray),
    query("words.*").isString().notEmpty(),
    query("tags").customSanitizer(commaToArray),
    query("tags.*").isString().notEmpty(),
]