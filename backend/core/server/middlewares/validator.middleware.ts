import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import BadRequest from "../responses/BadRequest.response"

const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const body = errors.array().map(item => ({
            name: item.param,
            message: item.msg
        }))

        return new BadRequest("Bad request", body).send(res);
    }

    next();
}

export default validatorMiddleware;