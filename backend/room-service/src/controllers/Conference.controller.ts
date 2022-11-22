import { Request, Response } from "express";

import ConferenceService from "@services/Conference.service";
import SignalService from "@services-communication/services/Signal.service";

import { getUser } from "core/utils/user";

import NotFoundResponse from "core/server/responses/NotFound.response";
import SuccessResponse from "core/server/responses/Success.response";

class ConferenceController {
    async create(req: Request, res: Response) {
        const roomId = BigInt(req.body.room_id);
        const name = req.body.name;
        const description = req.body.description;

        const user = getUser(req);

        const conference = await ConferenceService.create(roomId, user.id, name, description);

        if (conference) {
            return new SuccessResponse({ conference }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }

    async delete(req: Request, res: Response) {
        const conferenceId = req.params.id;

        const user = getUser(req);

        const count = await ConferenceService.delete(conferenceId, user.id);

        if (count > 0) {
            return new SuccessResponse("Success delete conference").send(res);
        }

        new NotFoundResponse("Conference is not found.").send(res);
    }

    async updateEnableAudio(req: Request, res: Response) {
        const conferenceId = req.body.conference_id;
        const enableAudio = req.body.enable_audio;

        const user = getUser(req);
        
        const count = await ConferenceService.updateEnableAudio(conferenceId, user.id, enableAudio);

        if (count > 0) {
            const conference = await ConferenceService.findConferenceByIdPrivilege(conferenceId);
            if (conference) {
                SignalService.updateConferenceInformation(conference);
            }

            return new SuccessResponse({ enable_audio: enableAudio }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }
    
    async updateEnableVideo(req: Request, res: Response) {
        const conferenceId = req.body.conference_id;
        const enableVideo = req.body.enable_video;
        
        const user = getUser(req);

        const count = await ConferenceService.updateEnableVideo(conferenceId, user.id, enableVideo);

        if (count > 0) {
            const conference = await ConferenceService.findConferenceByIdPrivilege(conferenceId);
            if (conference) {
                SignalService.updateConferenceInformation(conference);
            }
            
            return new SuccessResponse({ enable_video: enableVideo }).send(res);
        }

        new NotFoundResponse("Room is not found.").send(res);
    }
}

export default new ConferenceController();