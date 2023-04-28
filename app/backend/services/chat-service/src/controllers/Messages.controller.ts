import { Request, Response } from "express";

import MessagesService from "@services/Messages.service";

import SuccessResponse from "core/server/responses/Success.response";

class MessagesController {
    async findAll(req: Request, res: Response) {
        const conferenceId = req.params.conference_id;

        const messages = await MessagesService.findAll(conferenceId);

        new SuccessResponse({ messages }).send(res);
    }
}

export default new MessagesController();