import { Request, Response } from "express";

import RoomsService from "@services/Rooms.service";

import { getUser } from "core/utils/user";

import SuccessResponse from "core/server/responses/Success.response";
import NotFoundResponse from "core/server/responses/NotFound.response";
import BadRequestResponse from "core/server/responses/BadRequest.response";

class RoomsController {
    async create(req: Request, res: Response) {
        const name = req.body.name;
        const password = req.body.password;
        const tags = req.body.tags as string[] || [];
        
        const user = getUser(req); 

        const room = await RoomsService.create(name, password, user.id, tags);

        new SuccessResponse({ room }).send(res);
    }

    async delete(req: Request, res: Response) {
        const id = BigInt(req.params.id);

        const user = getUser(req);

        const room = await RoomsService.delete(id, user.id);

        if (room) { 
            return new SuccessResponse({ room }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }

    async getCreatedRooms(req: Request, res: Response) {
        const user = getUser(req);

        const rooms = await RoomsService.getCreated(user.id);

        new SuccessResponse({ rooms }).send(res);
    }

    async getFavoritesRooms(req: Request, res: Response) {
        const user = getUser(req);

        const rooms = await RoomsService.getFavorites(user.id);

        new SuccessResponse({ rooms }).send(res);
    }

    async addRoomToFavorites(req: Request, res: Response) {
        const id = BigInt(req.params.id);
        const user = getUser(req);

        const room = await RoomsService.addToFavorites(id, user.id);

        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new BadRequestResponse("Room is not found.").send(res);
    }

    async deleteRoomFromFavorites(req: Request, res: Response) {
        const id = BigInt(req.params.id);
        const user = getUser(req);

        const room = await RoomsService.deleteFromFavorites(id, user.id);

        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new BadRequestResponse("Room is not found.").send(res);
    }

    async search(req: Request, res: Response) {
        const words = req.query.words as string[];
        const tags = req.query.tags as string[];

        const rooms = await RoomsService.search(words, tags);

        new SuccessResponse({ rooms }).send(res);
    }
}

export default new RoomsController();