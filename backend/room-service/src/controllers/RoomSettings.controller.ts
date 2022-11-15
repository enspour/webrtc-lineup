import { Request, Response } from "express";

import RoomSettingsService from "@services/RoomSettings.service";
import SignalService from "@services-communication/services/Signal.service";

import { getUser } from "core/utils/user";

import NotFoundResponse from "core/server/responses/NotFound.response";
import SuccessResponse from "core/server/responses/Success.response";

class RoomSettingsController {
    async updateVisibility(req: Request, res: Response) {
        const id = BigInt(req.body.id);
        const visibility = req.body.visibility;
        
        const user = getUser(req);
        
        const count = await RoomSettingsService.updateVisibility(id, user.id, visibility);

        if (count > 0) {
            SignalService.updateRoomInformationConnectedUsers(id);
            return new SuccessResponse({ visibility }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }

    async updateEnableAudio(req: Request, res: Response) {
        const id = BigInt(req.body.id);
        const enable_audio = req.body.enable_audio;

        const user = getUser(req);
        
        const count = await RoomSettingsService.updateEnableAudio(id, user.id, enable_audio);

        if (count > 0) {
            SignalService.updateRoomInformationConnectedUsers(id);
            return new SuccessResponse({ enable_audio }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }
    
    async updateEnableVideo(req: Request, res: Response) {
        const id = BigInt(req.body.id);
        const enable_video = req.body.enable_video;
        
        const user = getUser(req);

        const count = await RoomSettingsService.updateEnableVideo(id, user.id, enable_video);

        if (count > 0) {
            SignalService.updateRoomInformationConnectedUsers(id);
            return new SuccessResponse({ enable_video }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }
}

export default new RoomSettingsController();