import APIResponse from "./API.response";

import HTTPCodes from "../HTTPCodes";

export default class BadRequestResponse extends APIResponse {
    constructor(public message: string, body?: any) {
        super(HTTPCodes.BAD_REQUEST, body);
    }
}