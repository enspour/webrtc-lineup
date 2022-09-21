import APIResponse from "./API.response";

import HTTPCodes from "../HTTPCodes";

export default class CreatedResponse extends APIResponse {
    constructor(body: any) {
        super(HTTPCodes.CREATED, body);
    }
}