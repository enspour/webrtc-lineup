import { Request, Response } from "express";

import SuccessResponse from "core/server/responses/Success.response";

import services from "@socket/services";

class UsersController {
    async updateRoomInformation(req: Request, res: Response) {
        const room = req.body.room;

        services.users.updateRoomInformation(room);
        
        new SuccessResponse("Success notify users.").send(res);
    }

    async updateConferenceInformation(req: Request, res: Response) {
        const conference = req.body.conference;

        services.users.updateConferenceInformation(conference);

        return new SuccessResponse("Success notify users.").send(res);
    }
}

export default new UsersController();