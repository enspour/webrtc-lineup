import QueryError from "./QueryError";
import TypesErrors from "./TypesErrors";

export default class UnknownError extends QueryError {
    constructor(public message: string) {
        super(message, TypesErrors.UNKNOWN);
    }
}