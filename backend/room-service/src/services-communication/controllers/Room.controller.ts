import { Request, Response } from "express";

import RoomService from "@services/Room.service";

import SuccessResponse from "core/server/responses/Success.response";
import NotFoundResponse from "core/server/responses/NotFound.response";

class RoomController {
    async findOneWithAuth(req: Request, res: Response) {
        const id = String(req.query.id);
        const userId = String(req.query.user_id);

        const room = await RoomService.findRoomByIdWithAuth(BigInt(id), BigInt(userId));
        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new NotFoundResponse("Room is not found").send(res);
    }
}

export default new RoomController();