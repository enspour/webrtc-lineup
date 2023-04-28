import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface IdPayload {
    id: string
}

const schema: JSONSchemaType<IdPayload> = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false
}

export const idValidator = (payload: IdPayload) => validator(schema, payload);