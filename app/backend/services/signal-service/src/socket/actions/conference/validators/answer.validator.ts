import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface AnswerPayload {
    conferenceId: string;
    destinationId: string;
    answer: {
        type: string;
        sdp: string;
    };
}

const schema: JSONSchemaType<AnswerPayload> = {
    type: "object",
    properties: {
        conferenceId: { type: "string" },
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
    required: ["conferenceId", "destinationId", "answer"],
    additionalProperties: false
}

export const answerValidator = (payload: AnswerPayload) => validator(schema, payload);