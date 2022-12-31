import APIResponse from "./API.response";

import HTTPCodes from "../HTTPCodes";

export default class Unauthorized extends APIResponse {
    constructor(public message: string, body?: any) {
        super(HTTPCodes.UNAUTHORIZED, body);
    }
}