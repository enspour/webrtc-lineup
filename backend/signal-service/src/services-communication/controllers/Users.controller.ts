import { Request, Response } from "express";

import RoomService from "@services/Room.service";

import SuccessResponse from "core/server/responses/Success.response";
import BadRequestResponse from "core/server/responses/BadRequest.response";

import services from "@socket/services";

class UsersController {
    async updateRoomInformation(req: Request, res: Response) {
        const id = req.params.id;

        const room = await RoomService.findRoomByIdPrivilege(BigInt(id));

        if (room) {
            services.users.updateRoomInformation(id, room);
            return new SuccessResponse("Success notify users.").send(res);
        }

        new BadRequestResponse("Room is not found.").send(res);
    }
}

export default new UsersController();