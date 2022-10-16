import Base from "./Base.notifications";

export default class NotFound extends Base{
    constructor(action: string, message: string, data?: any) {
        super(action, 404, message, data)
    }
}