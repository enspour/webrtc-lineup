import { Request, Response } from "express";

import ServerErrorResponse from "./responses/ServerError.response";

export default (handler: (req: Request, res: Response) => Promise<any>) => {
    return async (req: Request, res: Response) => {
        try {
            await handler(req, res);            
        } catch (error) { 
            console.error(error);
            new ServerErrorResponse("Server error 500").send(res);
        }
    }
}