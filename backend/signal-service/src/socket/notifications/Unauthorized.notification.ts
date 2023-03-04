import BaseNotification from "./Base.notifications";

export default class Unauthorized extends BaseNotification {
    constructor(action: string, message: string, data?: any) {
        super(action, 401, message, data)
    }
}