import { body } from "express-validator";

export default [
    body("name").isString().notEmpty(),
    body("password").isString(),
    body("tags").isArray().optional(),
    body("tags.*")
        .isString()
        .notEmpty()
        .toLowerCase()
        .not().contains("#")
        .not().contains(" "),
];