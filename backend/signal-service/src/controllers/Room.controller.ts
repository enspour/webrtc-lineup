import { Request, Response } from "express";

import services from "@socket/services";

import SuccessResponse from "core/server/responses/Success.response";

class RoomController {
    async getUsers(req: Request, res: Response) {
        const roomId = req.params.roomId;

        const users = services.rooms.getUsersIds(roomId);

        return new SuccessResponse({ users }).send(res);
    }
}

export default new RoomController();