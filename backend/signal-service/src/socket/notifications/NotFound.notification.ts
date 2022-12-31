import BaseNotification from "./Base.notifications";

export default class NotFound extends BaseNotification {
    constructor(action: string, message: string, data?: any) {
        super(action, 404, message, data)
    }
}