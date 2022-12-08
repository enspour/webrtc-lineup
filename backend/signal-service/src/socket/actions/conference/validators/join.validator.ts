import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface JoinPayload {
    roomId: string,
    conferenceId: string,
}

const schema: JSONSchemaType<JoinPayload> = {
    type: "object",
    properties: {
        roomId: { type: "string" },
        conferenceId: { type: "string" },
    },
    required: ["roomId", "conferenceId"],
    additionalProperties: false
}

export const joinValidator = (payload: JoinPayload) => validator(schema, payload);