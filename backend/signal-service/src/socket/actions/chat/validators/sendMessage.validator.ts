import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface SendMessagePayload {
    conferenceId: string,
    tempId: string,
    text: string,
}

const schema: JSONSchemaType<SendMessagePayload> = {
    type: "object",
    properties: {
        conferenceId: { type: "string" },
        tempId: { type: "string" },
        text: { type: "string" }
    },
    required: ["conferenceId", "tempId", "text"],
    additionalProperties: false
}

export const sendMessageValidator = (payload: SendMessagePayload) => validator(schema, payload);