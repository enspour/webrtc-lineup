import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface AnswerPayload {
    roomId: string;
    destinationId: string;
    answer: {
        type: string;
        sdp: string;
    };
}

const schema: JSONSchemaType<AnswerPayload> = {
    type: "object",
    properties: {
        roomId: { type: "string" },
        destinationId: { type: "string" },
        answer: { 
            type: "object",
            properties: {
                type: { type: "string" },
                sdp: { type: "string" }
            },
            required: ["type", "sdp"],
            additionalProperties: false
        },
    },
    required: ["roomId", "destinationId", "answer"],
    additionalProperties: false
}

export const answerValidator = (payload: AnswerPayload) => validator(schema, payload);