import TypesErrors from "./TypesErrors";

export default class QueryError extends Error {
    constructor(public message: string, public type: TypesErrors) {
        super(message);
    }
}