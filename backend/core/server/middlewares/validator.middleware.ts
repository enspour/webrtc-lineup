import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import BadRequest from "../responses/BadRequest.response"

const validatorMiddleware = (message: string = "Bad request") => (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const body = errors.array().map(item => ({
            name: item.param,
            message: item.msg
        }))

        return new BadRequest(message, body).send(res);
    }

    next();
}

export default validatorMiddleware;