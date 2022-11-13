import { Request, Response } from "express";

import RoomService from "@services/Room.service";

import NotFoundResponse from "core/server/responses/NotFound.response";
import SuccessResponse from "core/server/responses/Success.response";

class RoomController {
    async getRoom(req: Request, res: Response) {
        const id = BigInt(req.params.id);

        const room = await RoomService.getRoom(id);

        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }
}

export default new RoomController();