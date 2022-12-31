import QueryError from "./QueryError";
import TypesErrors from "./TypesErrors";

export default class DuplicateError extends QueryError {
    constructor(public message: string, public field: string) {
        super(message, TypesErrors.DUPLICATE);
    }
}