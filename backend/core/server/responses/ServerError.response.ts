import APIResponse from "./API.response";

import HTTPCodes from "../HTTPCodes";

export default class ServerErrorResponse extends APIResponse {
    constructor(public message: string, body?: any) {
        super(HTTPCodes.SERVER_ERROR, body);
    }
}