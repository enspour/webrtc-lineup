import express from "express";

export default class APIResponse {
    constructor(public status: number, public body: any) {}

    protected sanitize<T extends APIResponse>(target: T) {
        const _clone: T = <T>{};
        Object.assign(_clone, target);

        for (let field in _clone) {
            if (typeof _clone[field] === "undefined") {
                delete _clone[field];
            }
        }

        return _clone;
    }

    send(res: express.Response) {
        const response = JSON.stringify(
            this.sanitize(this), 
            (_, value) => typeof value === "bigint" 
                ? value.toString() 
                : value
        );
        
        res.status(this.status).end(response);
    }
}