import Base from "./Base.notifications";

export default class BadRequest extends Base{
    constructor(action: string, message: string, data?: any) {
        super(action, 400, message, data)
    }
}