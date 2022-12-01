import { Request, Response } from "express";

import UserService from "@services/User.service";

import NotFoundResponse from "core/server/responses/NotFound.response";
import SuccessResponse from "core/server/responses/Success.response";

class UserController {
    async findOne(req: Request, res: Response) {
        const id = req.params.id;

        const user = await UserService.findById(BigInt(id));

        if (user) {
            return new SuccessResponse({ user }).send(res);
        }

        new NotFoundResponse("User is not found.").send(res);
    }
}

export default new UserController();