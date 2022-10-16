import Base from "./Base.notifications";

export default class Success extends Base{
    constructor(action: string, message: string, data?: any) {
        super(action, 200, message, data)
    }
}