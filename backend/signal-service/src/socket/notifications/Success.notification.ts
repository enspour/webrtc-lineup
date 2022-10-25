import BaseNotification from "./Base.notifications";

export default class Success extends BaseNotification {
    constructor(action: string, message: string, data?: any) {
        super(action, 200, message, data)
    }
}