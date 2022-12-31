import APIResponse from "./API.response"

import HTTPCodes from "../HTTPCodes";

export default class SuccessResponse extends APIResponse {
    constructor(body: any) {
        super(HTTPCodes.SUCCESS, body);
    }
}