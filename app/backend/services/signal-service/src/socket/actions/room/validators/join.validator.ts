import { JSONSchemaType } from "ajv";
import validator from "@utils/validator";

export interface JoinPayload {
    id: string
    password: string
}

const schema: JSONSchemaType<JoinPayload> = {
    type: "object",
    properties: {
        id: { type: "string" },
        password: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false
}

export const joinValidator = (payload: JoinPayload) => validator(schema, payload);