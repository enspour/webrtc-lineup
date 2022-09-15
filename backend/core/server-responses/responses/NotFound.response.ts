import APIResponse from "./API.response";

import HTTPCodes from "../HTTPCodes";

export default class NotFoundResponse extends APIResponse {
    constructor(public message: string, body?: any) {
        super(HTTPCodes.NOT_FOUND, body);
    }
}