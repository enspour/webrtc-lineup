import { Request, Response } from "express";

import RoomsService from "@services/Rooms.service";

import { getUser } from "core/utils/user";

import SuccessResponse from "core/server/responses/Success.response";

class RoomsController {
    async findCreatedRooms(req: Request, res: Response) {
        const user = getUser(req);

        const rooms = await RoomsService.findCreatedRooms(user.id);

        new SuccessResponse({ rooms }).send(res);
    }

    async findFavoritesRooms(req: Request, res: Response) {
        const user = getUser(req);

        const rooms = await RoomsService.findFavoritesRooms(user.id);

        new SuccessResponse({ rooms }).send(res);
    }

    async search(req: Request, res: Response) {
        const words = req.query.words as string[];
        const tags = req.query.tags as string[];
        
        const user = getUser(req);

        const rooms = await RoomsService.search(user.id, words, tags);

        new SuccessResponse({ rooms }).send(res);
    }
}

export default new RoomsController();