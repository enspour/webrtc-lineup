import { Request, Response } from "express";

import ConferencesService from "@services/Conferences.service";

import { getUser } from "core/utils/user";

import SuccessResponse from "core/server/responses/Success.response";

class ConferencesController {
    async findAll(req: Request, res: Response) {
        const roomId = BigInt(req.params.room_id);

        const user = getUser(req);

        const conferences = await ConferencesService.findAll(roomId, user.id);

        return new SuccessResponse({ conferences }).send(res);
    }
}

export default new ConferencesController();