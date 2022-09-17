import QueryError from "./QueryError";
import TypesErrors from "./TypesErrors";

export default class UnknowError extends QueryError {
    constructor(public message: string) {
        super(message, TypesErrors.UNKNOW);
    }
}