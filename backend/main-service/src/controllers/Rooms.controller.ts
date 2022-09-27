import { Request, Response } from "express";

import RoomsService from "@services/Rooms.service";

import { getUser } from "core/utils/user";

import SuccessResponse from "core/server/responses/Success.response";
import NotFoundResponse from "core/server/responses/NotFound.response";

class RoomsController {
    async create(req: Request, res: Response) {
        const name = req.body.name;
        const password = req.body.password;
        const tags = req.body.tags as string[] || [];
        
        const user = getUser(req); 

        const room = await RoomsService.create(name, password, user.id, tags);

        new SuccessResponse({
            ...room,
            id: room.id.toString(),
            owner_id: room.owner_id.toString(),
        }).send(res);
    }

    async delete(req: Request, res: Response) {
        const id = BigInt(req.params.id);

        const user = getUser(req);

        const room = await RoomsService.delete(id, user.id);

        if (room) { 
            return new SuccessResponse({
                ...room,
                id: room.id.toString(),
                owner_id: room.owner_id.toString(),
            }).send(res);
        }

        return new NotFoundResponse("Room is not found.").send(res);
    }
}

export default new RoomsController();