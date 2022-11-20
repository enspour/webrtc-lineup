import { Request, Response } from "express";

import RoomService from "@services/Room.service";
import ConferenceService from "@services/Conference.service";

import SuccessResponse from "core/server/responses/Success.response";
import BadRequestResponse from "core/server/responses/BadRequest.response";

import services from "@socket/services";

class UsersController {
    async updateRoomInformation(req: Request, res: Response) {
        const id = req.params.id;

        const room = await RoomService.findOneByIdPrivilege(BigInt(id));

        if (room) {
            services.users.updateRoomInformation(id, room);
            return new SuccessResponse("Success notify users.").send(res);
        }

        new BadRequestResponse("Room is not found.").send(res);
    }

    async updateConferenceInformation(req: Request, res: Response) {
        const id = req.params.id;
        
        const conference = await ConferenceService.findOneByIdPrivilege(id);

        if (conference && id.includes("|")) {
            const [roomId] = id.split("|");
            services.users.updateConferenceInformation(roomId, conference);
            return new SuccessResponse("Success notify users.").send(res);
        }

        new BadRequestResponse("Conference is not found.").send(res);
    }
}

export default new UsersController();