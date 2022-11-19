import { Request, Response } from "express";

import RoomService from "@services/Room.service";
import SignalService from "@services-communication/services/Signal.service";

import { getUser } from "core/utils/user";

import NotFoundResponse from "core/server/responses/NotFound.response";
import SuccessResponse from "core/server/responses/Success.response";
import BadRequestResponse from "core/server/responses/BadRequest.response";

class RoomController {
    async findOne(req: Request, res: Response) {
        const id = BigInt(req.params.id);

        const user = getUser(req);

        const room = await RoomService.findOne(id, user.id);

        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }

    async create(req: Request, res: Response) {
        const name = req.body.name;
        const password = req.body.password;
        const tags = req.body.tags as string[] || [];
        
        const user = getUser(req); 

        const room = await RoomService.create(name, password, user.id, tags);

        new SuccessResponse({ room }).send(res);
    }

    async delete(req: Request, res: Response) {
        const id = BigInt(req.params.id);

        const user = getUser(req);

        const count = await RoomService.delete(id, user.id);

        if (count > 0) { 
            return new SuccessResponse("Success delete room.").send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }

    async addRoomToFavorites(req: Request, res: Response) {
        const id = BigInt(req.params.id);
        const user = getUser(req);

        const room = await RoomService.addToFavorites(id, user.id);

        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new BadRequestResponse("Room is not found.").send(res);
    }

    async deleteRoomFromFavorites(req: Request, res: Response) {
        const id = BigInt(req.params.id);
        const user = getUser(req);

        const room = await RoomService.deleteFromFavorites(id, user.id);

        if (room) {
            return new SuccessResponse({ room }).send(res);
        }

        new BadRequestResponse("Room is not found.").send(res);
    }

    async updateName(req: Request, res: Response) {
        const id = BigInt(req.body.id);
        const name = req.body.name;

        const user = getUser(req);

        const count = await RoomService.updateName(id, user.id, name);

        if (count > 0) {
            SignalService.updateRoomInformation(id);
            return new SuccessResponse({ name }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }

    async updateVisibility(req: Request, res: Response) {
        const id = BigInt(req.body.id);
        const visibility = req.body.visibility;
        
        const user = getUser(req);
        
        const count = await RoomService.updateVisibility(id, user.id, visibility);

        if (count > 0) {
            SignalService.updateRoomInformation(id);
            return new SuccessResponse({ visibility }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }
}

export default new RoomController();