import { Request, Response } from "express";

import RoomService from "@services/Room.service";

import SuccessResponse from "core/server/responses/Success.response";

class RoomController {
    async getUsers(req: Request, res: Response) {
        const roomId = req.params.roomId;

        const users = RoomService.getUsersIdInRoom(roomId);

        return new SuccessResponse({ users }).send(res);
    }
}

export default new RoomController();