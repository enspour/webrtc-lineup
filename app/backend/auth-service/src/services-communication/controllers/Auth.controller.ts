import { Request, Response } from "express";

import { accessTokenKeys } from "@loaders/jwt.keys";

import SuccessResponse from "core/server/responses/Success.response";

class AuthController {
    async accessTokenPublicKey(req: Request, res: Response) {
        const publicKey = accessTokenKeys.publicKey;
        new SuccessResponse({ key: publicKey }).send(res);
    }
}

export default new AuthController();