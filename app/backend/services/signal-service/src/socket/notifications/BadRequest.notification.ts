import BaseNotification from "./Base.notifications";

export default class BadRequest extends BaseNotification {
    constructor(action: string, message: string, data?: any) {
        super(action, 400, message, data)
    }
}