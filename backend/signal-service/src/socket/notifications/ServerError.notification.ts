import BaseNotification from "./Base.notifications";

export default class ServerError extends BaseNotification {
    constructor(action: string, message: string, data?: any) {
        super(action, 500, message, data)
    }
}