import { Request, Response } from "express";

import MessageService from "@services/Message.service";

import SuccessResponse from "core/server/responses/Success.response";
import ServerErrorResponse from "core/server/responses/ServerError.response";

class MessageController {
    async create(req: Request, res: Response) {
        const conferenceId = req.body.conference_id;
        const text = req.body.text;
        const user = req.body.user;

        const message = await MessageService.create(conferenceId, text, user);

        if (message) {
            return new SuccessResponse({ message }).send(res);
        }

        new ServerErrorResponse("Woops... Error saving message").send(res);
    }
}

export default new MessageController();